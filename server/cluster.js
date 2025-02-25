/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// cluster.js
import cluster from "cluster";
import os from 'os';

function setupCluster(app, PORT) {
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;

    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    app.listen(PORT, () => {
      console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
  }
}

export default setupCluster;
