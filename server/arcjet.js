/**
 * @fileoverview Arcjet Security Implementation for theHub
 *
 * This module implements Arcjet security services to protect theHub from common attacks,
 * bots, and rate limiting abuse. It configures various security rules to filter malicious
 * traffic and enforce rate limits across the application.
 *
 * @module arcjet
 * @requires @arcjet/node
 * @requires ./env
 */

import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

/**
 * Arcjet instance configuration
 * Creates and configures the Arcjet client with security rules for the application
 *
 * @constant aj
 * @type {import('@arcjet/node').Arcjet}
 */
const aj = arcjet({
  key: ARCJET_KEY, // API key from environment variables
  characteristics: ["ip.src"], // Track requests by IP address for rate limiting
  rules: [
    // Shield protects your app from common web attacks
    /**
     * Shield protection against common attacks
     * Defends against SQL injection, XSS, and other common web vulnerabilities
     */
    shield({ mode: "LIVE" }),

    /**
     * Bot detection and filtering
     * Identifies and blocks unwanted bot traffic while allowing legitimate crawlers
     * Mode: LIVE - actively blocks requests (DRY_RUN for logging only)
     */
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Allow list for beneficial bot categories
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services like Pingdom, UptimeRobot
        "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord, social media
      ],
    }),

    /**
     * Token bucket rate limiting
     * Implements a token bucket algorithm to control request frequency
     * This helps prevent abuse and ensures fair resource distribution
     */
    tokenBucket({
      mode: "LIVE", // Active rate limiting (use DRY_RUN for testing)
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Maximum bucket capacity of 10 tokens
      // Each request consumes one token
    }),
  ],
});

export default aj;
