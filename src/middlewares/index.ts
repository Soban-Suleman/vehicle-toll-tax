import cors from "cors";
import {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { vehicleNumberCheck } from "../helper";
import { VehicleToll } from "../models";
/**
 * Top Level Middlewares
 *
 * `CORS`
 *
 * `express.json`
 *
 * `urlencoded`
 *
 * `morgan`
 */
export default function (app: Express): void {
  app.use(cors());
  app.use(json({}));
  app.use(urlencoded({ extended: true }));
  app.use(ExpressMongoSanitize());
}

export const isValidVehicleNumber = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  vehicleNumberCheck(req.body.vehicleNumber)
    ? next()
    : res.status(400).json({ message: "Invalid Vehicle Number" });

export const isVehicleEntered = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  VehicleToll.exists({ vehicleNumber: req.body.vehicleNumber })
    .then((response) =>
      response
        ? next()
        : res.status(400).json({ message: "Vehicle Not Entered" })
    )
    .catch((error) => next(error));

export const isOddOrEven = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const numberPlate = parseInt(req.body.vehicleNumber.split("-")[1]);
    req.body.numberPlateInfo = numberPlate % 2 === 0 ? "even" : "odd";
    next();
  } catch (error) {
    next(error);
  }
};
