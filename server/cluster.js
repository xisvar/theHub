/**
 * @fileoverview Cluster Configuration Module for theHub server
 *
 * This module implements Node.js clustering to distribute the server workload
 * across multiple CPU cores, improving performance and reliability.
 * It handles worker process management, fault tolerance, and graceful shutdown.
 *
 * @module cluster
 * @requires cluster
 * @requires os
 * @requires ./databases/mongodb.databases
 */

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import cluster from "cluster";
import os from "os";
import connectToDatabase from "./databases/mongodb.databases.js";

/**
 * Sets up a clustered server environment with multiple worker processes.
 * The function creates worker processes based on available CPU cores and
 * handles process lifecycle management including fault tolerance and graceful shutdowns.
 *
 * @function setupCluster
 * @param {import('express').Application} app - The Express application instance
 * @param {number} PORT - The port number to listen on
 * @param {Object} [options={}] - Optional configuration parameters
 * @param {number} [options.workers=os.cpus().length] - Number of workers to spawn (defaults to CPU count)
 * @param {boolean} [options.enableRestart=true] - Whether to restart dead workers automatically
 * @returns {void}
 *
 * @example
 * // Basic usage with default options
 * import express from 'express';
 * import setupCluster from './cluster.js';
 *
 * const app = express();
 * const PORT = 3000;
 *
 * setupCluster(app, PORT);
 *
 * @example
 * // Advanced usage with custom options
 * setupCluster(app, PORT, {
 *   workers: 4,             // Use exactly 4 worker processes
 *   enableRestart: false    // Don't restart workers when they die
 * });
 */
function setupCluster(app, PORT, options = {}) {
  const { workers = os.cpus().length, enableRestart = true } = options;

  if (cluster.isPrimary) {
    console.log(`[CLUSTER] Primary process ${process.pid} is starting...`);
    console.log(
      `[CLUSTER] Launching ${workers} workers on ${os.cpus().length} available CPUs`
    );

    // Fork worker processes
    for (let i = 0; i < workers; i++) {
      cluster.fork();
    }

    // Handle worker exit and optionally restart them
    cluster.on("exit", (worker, code, signal) => {
      const exitType = signal ? `signal ${signal}` : `code ${code}`;
      console.log(
        `[CLUSTER] Worker ${worker.process.pid} died with ${exitType}`
      );

      // Restart dead workers unless they exited with a success code or restart is disabled
      if (enableRestart && code !== 0) {
        console.log("[CLUSTER] Spawning replacement worker");
        cluster.fork();
      }
    });

    // Handle various termination signals for graceful shutdown
    ["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
      process.on(signal, () => {
        console.log(
          `[CLUSTER] Primary received ${signal}, shutting down all workers...`
        );

        // Gracefully terminate all workers
        Object.values(cluster.workers).forEach((worker) => {
          worker.send("shutdown");

          // Force kill after timeout if worker doesn't exit cleanly
          setTimeout(() => {
            if (!worker.isDead()) {
              console.log(
                `[CLUSTER] Force killing worker ${worker.process.pid}`
              );
              worker.process.kill("SIGKILL");
            }
          }, 5000);
        });

        // Exit primary process after all workers are done
        process.exit(0);
      });
    });
  } else {
    // Worker process code
    const server = app.listen(PORT, async () => {
      console.log(
        `[WORKER] Process ${process.pid} started and listening on port ${PORT}`
      );
      // Connect to the database
      await connectToDatabase()
    });

    // Handle graceful shutdown request from primary
    process.on("message", (msg) => {
      if (msg === "shutdown") {
        console.log(
          `[WORKER] Worker ${process.pid} closing connections and shutting down`
        );

        // Close server and exit gracefully
        server.close(() => {
          console.log(`[WORKER] Worker ${process.pid} exited cleanly`);
          process.exit(0);
        });

        // Force exit if server.close takes too long
        setTimeout(() => {
          console.log(
            `[WORKER] Worker ${process.pid} forcing exit after timeout`
          );
          process.exit(1);
        }, 4000);
      }
    });
  }
}

export default setupCluster;
