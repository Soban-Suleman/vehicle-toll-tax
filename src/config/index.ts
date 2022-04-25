import { config } from "dotenv";
config();
export const ENVIRONMENT = process.env.APP_ENV || "dev";
export const IS_PRODUCTION = ENVIRONMENT === "production";
export const IS_TEST = ENVIRONMENT === "test";
export const APP_PORT = Number(process.env.PORT) || 3500;
export const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || "/api";
export const JWT_SECRET = process.env.JWT_SECRET || "thisismysecret123";
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";
export const PASSWORD = process.env.PASSWORD || "";
export const DB = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_USER_PWD,
  HOST: process.env.DB_HOST,
  NAME: process.env.DB_NAME,
  PORT: Number(process.env.DB_PORT) || 27017,
};
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/onebody";
