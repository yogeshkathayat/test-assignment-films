import dotenv from "dotenv";

/**
 *   Load environment variables from .env file, where API keys and passwords are configured
 */
dotenv.config({ path: ".env" });

/**
 * Environment variables
 */
export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const basePath = "/api/v1";
export const mongodbConnectionURL=process.env.MONGODB_URL
export const logs = process.env.NODE_ENV === "production " ? "combined " : "dev";
