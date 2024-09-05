import path from "path";
// import { envs } from "../config/plugins/envs.plugin";
import { CheckServiceUseCase } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { MongoDbLogDatasource } from "../infrastructure/datasources/mongo-db.datasources";
import { PostgresDbLogDatasource } from "../infrastructure/datasources/postgres-db.datasources";
import { CheckServiceMultipleUseCase } from "../domain/use-cases/checks/check-service-multiple";

// const logRepository = new LogRepositoryImpl(
//   // new FileSystemDatasource()
//   // new MongoDbLogDatasource()
//   new PostgresDbLogDatasource()
//   //new FirebaseDatasource()
// );

// const logRepositories = [
//   new LogRepositoryImpl(new FileSystemDatasource()),
//   new LogRepositoryImpl(new MongoDbLogDatasource()),
//   new LogRepositoryImpl(new PostgresDbLogDatasource()),
// ];

// const emailService = new EmailService();

export class Sever {
  public static async start() {
    console.log("¡Server Started!");
    // Mandar email
    // const emailTo = "jhustyn7@gmail.com";
    // console.log(emailTo);
    // const emailTo = "patriciacajas22@gmail.com";
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(emailTo);
    // emailService.sendEmailWithFileSysmtemLogs(email);
    // console.log("Server started...");
    // const url = "http://google.com";
    // const job = CronService.createJob("*/5 * * * * *", async () => {
    //   const time = new Date().toLocaleString("es-MX");
    //   const dateFromLocale = new Date(time);

    //   console.log(time);
    //   // await new CheckServiceMultipleUseCase(
    //   //   logRepositories,
    //   //   () => console.log("Service is up"),
    //   //   (error) => console.error(error)
    //   // ).execute(url);
    //   // await new CheckService().execute("http://localhost:3000");
    // });
    // const logs = await logRepository.getLog(LogSeverityLevel.high);
    // console.log(logs);
  }
}
