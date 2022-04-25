import { Router } from "express";
import {
  enterVehicle,
  exitVehicle,
} from "../controllers/vehicletoll.controller";
import {
  isOddOrEven,
  isValidVehicleNumber,
  isVehicleEntered,
} from "../middlewares";

const router: Router = Router();

router.post("/entry", isValidVehicleNumber, enterVehicle);

router.patch(
  "/exit",
  isValidVehicleNumber,
  isVehicleEntered,
  isOddOrEven,
  exitVehicle
);

export default router;
