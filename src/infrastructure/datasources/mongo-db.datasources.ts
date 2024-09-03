import { LogModel } from "../../data/mongo";
import { AbsLogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoDbLogDatasource implements AbsLogDatasource {
  constructor() {}

  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log("Log Entity saved in MongoDb");
    // console.log(newLog);
  }
  getLog(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return LogModel.find({ level: serverityLevel }).exec();
  }
  async getAllLogs(): Promise<LogEntity[]> {
    return await LogModel.find().exec();
  }
}
