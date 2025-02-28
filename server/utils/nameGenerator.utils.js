/**
 * @fileoverview Username Generation Utility
 *
 * This module provides functionality to generate random, customizable usernames
 * by combining adjectives and nouns from predefined word banks, with optional
 * number suffixes. It supports various formatting options including separators,
 * capitalization, and numeric appendages.
 *
 * @module nameGenerator
 * @requires ./nameBanks.utils
 */

// Import word banks (data)
import { adjectives, nouns } from "./nameBanks.utils.js";

/**
 * Generates random usernames by combining adjectives and nouns with customizable formatting.
 *
 * @function generateUsername
 * @param {Object} [options={}] - Configuration options for username generation
 * @param {string} [options.separator=""] - Character(s) to place between words and number (e.g., "_", "-")
 * @param {boolean} [options.includeNumber=true] - Whether to append a random number to the username
 * @param {number} [options.numberLength=3] - Length of the random number to append
 * @param {boolean} [options.capitalize=true] - Whether to capitalize the first letter of each word
 * @returns {string} A randomly generated username based on the specified options
 *
 * @example
 * // Generate default username (e.g., "BraveWolf482")
 * const username1 = generateUsername();
 *
 * @example
 * // Generate username with custom separator and number length
 * const username2 = generateUsername({ separator: "_", numberLength: 4 });
 * // Example output: "Mystic_Phoenix_1289"
 *
 * @example
 * // Generate username without number and with hyphen separator
 * const username3 = generateUsername({ includeNumber: false, separator: "-" });
 * // Example output: "Golden-Blade"
 */
function generateUsername(options = {}) {
  // Default parameters
  const {
    separator = "",
    includeNumber = true,
    numberLength = 3,
    capitalize = true,
  } = options;

  // Random selection
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  // Formatting
  const formattedAdjective = capitalize
    ? randomAdjective.charAt(0).toUpperCase() + randomAdjective.slice(1)
    : randomAdjective;

  const formattedNoun = capitalize
    ? randomNoun.charAt(0).toUpperCase() + randomNoun.slice(1)
    : randomNoun;

  // Combine parts
  let username = `${formattedAdjective}${separator}${formattedNoun}`;

  // Add number if requested
  if (includeNumber) {
    const min = Math.pow(10, numberLength - 1);
    const max = Math.pow(10, numberLength) - 1;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    username += separator + randomNumber;
  }

  return username;
}

export default generateUsername;
