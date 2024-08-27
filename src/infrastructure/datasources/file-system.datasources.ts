import fs from "fs";

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDataSource {
  private readonly logPath: string = "logs/";

  //Se puede crear un mapa para tener cada path y agregar uno de forma mas facil
  private readonly logsPaths = new Map<LogSeverityLevel, string>([
    [LogSeverityLevel.low, "logs/logs-all.log"],
    [LogSeverityLevel.medium, "logs/logs-medium.log"],
    [LogSeverityLevel.high, "logs/logs-high.log"],
  ]);

  constructor() {
    this.createLogsFiles();
  }

  //Creacion de el direcctorio y los ficheros para los logs
  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    //Aplicando el pricipio: Dont'd repeat your self
    this.logsPaths.forEach(([path, level]) => {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
    });
  };

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJSON = `${JSON.stringify(log)}\n`;

    //Save all logs
    fs.appendFileSync(this.logsPaths.get(LogSeverityLevel.low)!, logAsJSON);

    //Save only medium and high severity logs
    if (log.level !== LogSeverityLevel.low) {
      fs.appendFileSync(this.logsPaths.get(log.level)!, logAsJSON);
      return;
    }

    return;
  }

  getLog(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
  getAllLogs(): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
}
