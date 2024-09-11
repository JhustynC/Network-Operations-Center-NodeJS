import { PrismaClient, SeverityLevel } from "@prisma/client";
import { AbsLogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import Mail from "nodemailer/lib/mailer";

const prisma = new PrismaClient();

const logsLevels = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresDbLogDatasource implements AbsLogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = logsLevels[log.level as keyof typeof logsLevels];

    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level: level,
      },
    });

    console.log("Save Log in Postgres");
  }
  async getLog(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = logsLevels[serverityLevel as keyof typeof logsLevels];
    let logs = await prisma.logModel.findMany({
      where: {
        level: level,
      },
    });

    return logs.map((dbLog) => LogEntity.fromObject(dbLog));
  }
  async getAllLogs(): Promise<LogEntity[]> {
    const logs = await prisma.logModel.findMany();
    return logs.map((dbLog) => LogEntity.fromObject(dbLog));
    // throw new Error("Method not implemented.");
  }
}
