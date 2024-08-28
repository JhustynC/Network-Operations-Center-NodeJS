import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLog(serverityLevel: LogSeverityLevel): Promise<LogEntity[]>;
  abstract getAllLogs(): Promise<LogEntity[]>;
}
