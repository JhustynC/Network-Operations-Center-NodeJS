import path from "path";
import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoDbLogDatasource } from "../infrastructure/datasources/mongo-db.datasources";
import { LogSeverityLevel } from "../domain/entities/log.entity";

const logRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  // new MongoDbLogDatasource()
  //new PostgresSQLDatasource()
  //new FirebaseDatasource()
);

const emailService = new EmailService();

export class Sever {
  public static async start() {
    // Mandar email
    // const emailTo = "jhustyn7@gmail.com";
    // console.log(emailTo);
    // const emailTo = "patriciacajas22@gmail.com";
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(emailTo);

    // emailService.sendEmailWithFileSysmtemLogs(email);

    // console.log("Server started...");
    // const url = "http://google.com";
    // CronService.createJob("*/5 * * * * *", async () => {
    //   await new CheckService(
    //     logRepository,
    //     () => console.log("Service is up"),
    //     (error) => console.error(error)
    //   ).execute(url);
    //   // await new CheckService().execute("http://localhost:3000");
    // });

    const logs = await logRepository.getLog(LogSeverityLevel.high);
    console.log(logs);
  }
}
