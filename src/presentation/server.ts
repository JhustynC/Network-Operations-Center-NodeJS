import path from "path";
import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  //new PostgresSQLDatasource()
  //new MongoDbDatasource()
  //new FirebaseDatasource()
);

const emailService = new EmailService();

export class Sever {
  public static start() {
    // Mandar email
    const emailTo = "jhustyn7@gmail.com";
    // const emailTo = "patriciacajas22@gmail.com";
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(emailTo);

    // emailService.sendEmailWithFileSysmtemLogs(email);

    // console.log("Server started...");
    // const url = "http://google.com";
    // CronService.createJob("*/5 * * * * *", async () => {
    //   await new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log("Service is up"),
    //     (error) => console.error(error)
    //   ).execute(url);
    //   // await new CheckService().execute("http://localhost:3000");
    // });
  }
}
