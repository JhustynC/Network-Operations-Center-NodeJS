import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLog(serverityLevel: LogSeverityLevel): Promise<LogEntity[]>;
  abstract getAllLogs(): Promise<LogEntity[]>;
}

