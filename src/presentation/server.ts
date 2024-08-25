import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Sever {
  public static start() {
    console.log("Server started...");
    CronService.createJob("*/5 * * * * *", async () => {
      await new CheckService().execute("http://google.com");
    });
  }
}
