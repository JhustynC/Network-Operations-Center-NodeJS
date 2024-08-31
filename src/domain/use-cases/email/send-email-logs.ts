import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { AbsLogRepository } from "../../repository/log.repository";

interface ISendLogEmailUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements ISendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: AbsLogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sentEmail = await this.emailService.sendEmailWithFileSysmtemLogs(
        to
      );
      if (!sentEmail) {
        throw new Error("Error sending mail");
      }
      this.logRepository.saveLog(
        new LogEntity({
          level: LogSeverityLevel.mailer,
          message: `Correctly delivered mail to:${to}`,
          origin: "send-email-logs.ts",
        })
      );
      return true;
    } catch {
      this.logRepository.saveLog(
        new LogEntity({
          level: LogSeverityLevel.high,
          message: `Error sending email logs to:${to}`,
          origin: "send-email-logs.ts",
        })
      );
      return false;
    }
  }
}
