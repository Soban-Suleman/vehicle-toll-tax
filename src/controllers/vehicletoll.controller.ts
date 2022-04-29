import { NextFunction, Request, Response } from "express";
import { ensure, getEntryExitDetails } from "../data";
import { discountCalculator } from "../helper";
import { VehicleToll } from "../models";
export const enterVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      vehicleNumber,
      dateTimeEntry,
      entryPoint,
      numberPlateInfo,
    }: {
      vehicleNumber: string;
      dateTimeEntry: string;
      entryPoint: number;
      numberPlateInfo: "odd" | "even";
    } = req.body;
    const discount = discountCalculator(dateTimeEntry, numberPlateInfo);
    await VehicleToll.create({
      vehicleNumber,
      dateTimeEntry,
      entryPoint,
      discount,
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
    let BASE_RATE = 0.2;
    let BASE_FARE = 20;
    const {
      vehicleNumber,
      exitPoint,
    }: { vehicleNumber: string; exitPoint: string } = req.body;
    const record = ensure(
      await VehicleToll.findOne({
        $and: [{ vehicleNumber }, { exitStatus: false }],
      }),
      "Vehicle With given details Not Found"
    );
    const entryDetails = getEntryExitDetails(record?.entryPoint);
    const exitDetails = getEntryExitDetails(parseInt(exitPoint));
    const exitDay = new Date().toDateString().split(" ")[0];
    if (exitDay === "Sat" || exitDay === "Sun") BASE_RATE = 1.5 * BASE_RATE;
    const distance = exitDetails?.distance - entryDetails?.distance;
    record.exitStatus = true;
    await record.save();
    res.status(201).json({
      baseRate: BASE_RATE,
      totalDistance: distance,
      subTotal: distance * BASE_RATE,
      discount: record?.discount,
      toBeCharged:
        ((record?.discount as number) * distance * BASE_RATE) / 100 + BASE_FARE,
    });
  } catch (error) {
    next(error);
  }
};
