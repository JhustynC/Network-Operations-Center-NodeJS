import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Sever {
  public static start() {
    console.log("Server started...");
    const url = "http://google.com";
    CronService.createJob("*/5 * * * * *", async () => {
      await new CheckService(
        () => console.log("Service is up"),
        (error) => console.error(error)
      ).execute(url);
      // await new CheckService().execute("http://localhost:3000");
    });
  }
}
