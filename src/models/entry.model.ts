import { Document, model, Schema } from "mongoose";

export interface IVehicle {
  vehicleNumber: string;
  entryPoint?: number;
  exitPoint?: number;
  dateTimeEntry?: string;
  dateTimeExit?: string;
}

interface IVehicleModel extends Document, IVehicle {
  createdAt: string;
  updatedAt: string;
}
const vehicleTollSchema = new Schema<IVehicleModel>(
  {
    vehicleNumber: { type: String },
    entryPoint: { type: Number },
    exitPoint: { type: Number },
    dateTimeEntry: { type: String },
    dateTimeExit: { type: String },
  },
  { timestamps: true }
);

const Vehicle = model<IVehicleModel>("Vehicle", vehicleTollSchema);

export default Vehicle;
