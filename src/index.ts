import express, { Express } from "express";
import { APP_PORT, APP_PREFIX_PATH, IS_TEST } from "./config";
import logger from "./config/logger";
import { Logger } from "winston";
import { morganErrorHandler, morganSuccessHandler } from "./config/morgan";
import dbConnect from "./database";
import middlewares from "./middlewares";
import { errorConverter, errorHandler } from "./middlewares/error";
import apiRoutes from "./routes/routes";

const app: Express = express();
middlewares(app);
dbConnect();

if (!IS_TEST) {
  app.use(morganSuccessHandler);
  app.use(morganErrorHandler);
}
app.use(APP_PREFIX_PATH, apiRoutes);

app.use(errorConverter);
app.use(errorHandler);

app.listen(
  APP_PORT,
  (): Logger => logger.info(`Server Running on Port ${APP_PORT}`)
);
process.on(
  "uncaughtException",
  (err): Logger =>
    logger.error(`Uncaught exception
  message: ${err.message}
  name: ${err.name}
  stack: ${err.stack}`)
);
