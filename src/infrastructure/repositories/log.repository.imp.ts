import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  constructor(private logDatasource: LogDatasource) {}

  saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }

  getLog(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLog(serverityLevel);
  }

  getAllLogs(): Promise<LogEntity[]> {
    return this.logDatasource.getAllLogs();
  }
}
