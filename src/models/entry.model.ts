import { Document, model, Schema } from "mongoose";

export interface IVehicle {
  vehicleNumber: string;
  entryPoint?: number;
  exitPoint?: number;
  dateTimeEntry?: string;
  dateTimeExit?: string;
  discount: number;
  exitStatus: boolean;
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
    discount: Number,
    exitStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Vehicle = model<IVehicleModel>("Vehicle", vehicleTollSchema);

export default Vehicle;
