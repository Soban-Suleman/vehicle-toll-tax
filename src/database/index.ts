import { DB, IS_PRODUCTION, IS_TEST, MONGO_URI } from "../config";
import logger from "../config/logger";
import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

let mongoURI: string;
if (DB.HOST && DB.NAME && DB.PASSWORD && DB.USER) {
  mongoURI = `mongodb+srv://${DB.USER}:${encodeURIComponent(DB.PASSWORD)}@${
    DB.HOST
  }/${DB.NAME}`;
} else {
  mongoURI = MONGO_URI;
}

if (IS_TEST) {
  mongoURI += "-test";
}
export default function dbConnection() {
  logger.info("connecting to database...");

  mongoose
    .connect(mongoURI, options)
    .then(() => {
      logger.info("Mongoose connection done");
    })
    .catch((e) => {
      logger.info("Mongoose connection error");
      logger.error(e);
    });

  // CONNECTION EVENTS
  // When successfully connected
  if (!IS_PRODUCTION) {
    mongoose.connection.on("connected", () => {
      logger.debug("Mongoose default connection open to " + mongoURI);
    });
  }

  // If the connection throws an error
  mongoose.connection.on("error", (err) => {
    logger.error("Mongoose default connection error: " + err);
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", () => {
    logger.info("Mongoose default connection disconnected");
  });

  // If the Node process ends, close the Mongoose connection (ctrl + c)
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      logger.info(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });
}
