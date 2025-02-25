// This is the env file that handles environment variable configurations.
import { config } from "dotenv";

// Configure dotenv to read the .env file
config({
  // eslint-disable-next-line no-undef
  path: `./config/.env.${process.env.NODE_ENV || "development"}.locals`,
});

export const {
  PORT,
  DB_URI,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  // eslint-disable-next-line no-undef
} = process.env;