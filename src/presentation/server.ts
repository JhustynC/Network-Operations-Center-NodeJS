import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  //new PostgresSQLDatasource()
  //new MongoDbDatasource()
  //new FirebaseDatasource()
);

export class Sever {
  public static start() {
    console.log("Server started...");
    const url = "http://google.com";
    CronService.createJob("*/5 * * * * *", async () => {
      await new CheckService(
        fileSystemLogRepository,
        () => console.log("Service is up"),
        (error) => console.error(error)
      ).execute(url);
      // await new CheckService().execute("http://localhost:3000");
    });
  }
}
