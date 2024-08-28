export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;

  constructor(level: LogSeverityLevel, message: string, createAt = new Date()) {
    this.level = level;
    this.message = message;
    this.createAt = createAt;
  }

  static fromJSON = (jsonObject: string): LogEntity => {
    const { message, level, createAt } = JSON.parse(jsonObject);
    const log = new LogEntity(level, message, new Date(createAt));
    return log;
  };
}
