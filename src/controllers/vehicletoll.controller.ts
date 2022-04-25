import { NextFunction, Request, Response } from "express";
import { discountCalculator } from "../helper";
import { VehicleToll } from "../models";
import { IVehicle } from "../models/entry.model";

export const enterVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { vehicleNumber, dateTimeEntry, entryPoint }: IVehicle = req.body;
    await VehicleToll.create({
      vehicleNumber,
      dateTimeEntry,
      entryPoint,
    });
    res.status(201).json({ message: "Vehicle entry done" });
  } catch (error) {
    next(error);
  }
};

export const exitVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { vehicleNumber, numberPlateInfo } = req.body;
    const record = await VehicleToll.findOne({ vehicleNumber });
    console.log(
      discountCalculator(record?.createdAt as string, numberPlateInfo)
    );
    res.status(200).json({ message: "done" });
  } catch (error) {
    next(error);
  }
};
