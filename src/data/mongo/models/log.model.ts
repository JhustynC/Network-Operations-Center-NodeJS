import mongoose from "mongoose";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";

/*
  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;
  public origin: string;
*/

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: Object.values(LogSeverityLevel),
    required: true,
    default: LogSeverityLevel.low,
  },
  message: { type: String, required: true },
  origin: { type: String, required: true },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

export const LogModel = mongoose.model("Log", logSchema);
