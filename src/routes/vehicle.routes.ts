import { Router } from "express";
import {
  enterVehicle,
  exitVehicle,
} from "../controllers/vehicletoll.controller";
import {
  alreadyExists,
  isOddOrEven,
  isValidVehicleNumber,
  isVehicleEntered,
} from "../middlewares";

const router: Router = Router();

router.post(
  "/entry",
  isValidVehicleNumber,
  alreadyExists,
  isOddOrEven,
  enterVehicle
);

router.patch("/exit", isValidVehicleNumber, isVehicleEntered, exitVehicle);

export default router;
