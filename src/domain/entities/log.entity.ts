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
      createAt: createAt,
      origin: origin,
    });
    return log;
  };
}
