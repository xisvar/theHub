/**
 * @fileoverview User Model Definition
 *
 * This module defines the User schema and model for MongoDB using Mongoose.
 * It includes comprehensive field definitions, validation rules, default values,
 * and optimized indexing for high-performance querying.
 *
 * @module UserModel
 * @requires mongoose
 * @requires ../utils/nameGenerator.utils
 */

import mongoose from "mongoose";

import generateUsername from "../utils/nameGenerator.utils.js";

/**
 * User Schema Definition
 *
 * Defines the structure, validation rules, and relationships for user documents
 * in the MongoDB database.
 *
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema(
  {
    /**
     * Username for the user
     * @type {String}
     * @unique
     * @indexed
     * @default Generated username from nameGenerator.utils
     */
    username: {
      type: String,
      required: false,
      unique: true, // Ensure usernames are unique
      trim: true,
      default: generateUsername({ numberLength: 4 }), // Generates a random username
      index: true, // Add an index for optimized queries by username
    },

    /**
     * Email address for the user
     * @type {String}
     * @required
     * @indexed
     * @unique Enforced at application level
     */
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, // Store emails in lowercase
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address.",
      ],
      index: true, // set this as an index
    },

    /**
     * User password (hashed)
     * Only required for non-Google users
     * @type {String}
     */
    password: {
      type: String,
      minLength: 8,
    },

    /**
     * Flag indicating if the user authenticated through Google OAuth
     * @type {Boolean}
     * @default false
     */
    isGoogleUser: {
      type: Boolean,
      default: false,
    },

    /**
     * Profile picture URL
     * @type {String}
     * @default ""
     */
    profilePicture: {
      type: String,
      trim: true,
      default: "",
      match: [
        /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/,
        "Please fill a valid URL ending with an image file extension.",
      ],
    },

    /**
     * User biography/description
     * @type {String}
     * @default ""
     */
    bio: {
      type: String,
      trim: true,
      default: "",
    },

    /**
     * User skills array
     * @type {Array<String>}
     * @default []
     */
    skills: {
      type: [String],
      validate: {
        validator: (skills) =>
          skills.every((skill) => typeof skill === "string"),
        message: "Each skill must be a string.",
      },
      default: [],
    },

    /**
     * User ranking level
     * @type {String}
     * @enum ["Novice", "Artisan", "Master", "Legend"]
     * @default "Novice"
     * @required
     * @indexed
     */
    rank: {
      type: String,
      enum: ["Novice", "Artisan", "Master", "Legend"],
      required: true,
      default: "Novice",
    },

    /**
     * User's followers
     * References to other User documents
     * @type {Array<mongoose.Schema.Types.ObjectId>}
     * @default []
     */
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    /**
     * Reputation points (RP)
     * @type {Number}
     * @min 0
     * @max 1000
     * @default 100
     */
    RP: {
      type: Number,
      default: 100,
      min: 0, // Ensure RP cannot be negative
      max: 1000, // Cap RP at 1000
    },

    /**
     * User's $HUBS token balance
     * @type {Number}
     * @min 0
     * @default 0
     */
    $HUBS_balance: {
      type: Number,
      default: 0,
      min: 0, // Ensure balance cannot be negative
    },

    /**
     * Communities the user has joined
     * References to Community documents
     * @type {Array<mongoose.Schema.Types.ObjectId>}
     * @default []
     */
    joined_communities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        default: [],
      },
    ],
  },
  // Enable timestamps to automatically add `created_at` and `updated_at` fields
  { timestamps: true }
);

// Create indexes for frequent queries (e.g., username and rank)
userSchema.index({ rank: 1 });

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;
