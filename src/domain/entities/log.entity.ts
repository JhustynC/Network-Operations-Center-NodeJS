import { $Enums } from "@prisma/client";

export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
  mailer = "mailer",
}

export interface ILogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createAt?: Date;
  origin: string;
}

export interface ILogPostgres {
  id: number;
  message: string;
  origin: string;
  level: $Enums.SeverityLevel;
  createAt: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;
  public origin: string;

  constructor({ level, message, origin, createAt }: ILogEntityOptions) {
    this.level = level;
    this.message = message;
    this.createAt = createAt ?? new Date();
    this.origin = origin;
  }

  static fromJSON = (jsonObject: string): LogEntity => {
    // if (!jsonObject || jsonObject.trim() === "") jsonObject = "{}";
    const { message, level, createAt, origin } = JSON.parse(jsonObject);
    const log = new LogEntity({
      level: level,
      message: message,
      createAt: new Date(createAt),
      origin: origin,
    });
    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { level, message, origin, createAt } = object;
    const log = new LogEntity({
      level: level as LogSeverityLevel,
      message,
      createAt,
      origin,
    });
    return log;
  };
}
