import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  public static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    const job = CronJob.from({
      cronTime: cronTime,
      onTick: onTick,
      start: true,
      timeZone: "America/Los_Angeles",
    });

    return job;
  }
}
