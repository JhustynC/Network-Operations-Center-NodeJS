import { SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";

describe("Send-email-logs.ts", () => {
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLog: jest.fn(),
    getAllLogs: jest.fn(),
  };

  const mockEmailService = {
    sendEmailWithFileSysmtemLogs: jest.fn().mockReturnValue(true),
  };
  
  // const emailService = new EmailService();
  // const mockEmailService = jest.spyOn(EmailService.prototype, "sendEmailWithFileSysmtemLogs").mockResolvedValue(true);
  const sendEmail = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Shpuld call email and save log", async () => {
    const result = await sendEmail.execute("test@test.com");
    expect(result).toBeTruthy();
    expect(mockEmailService.sendEmailWithFileSysmtemLogs).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createAt: expect.any(Date),
      level: LogSeverityLevel.mailer,
      message: "Correctly delivered mail to:test@test.com",
      origin: "send-email-logs.ts",
    });
  });
  
  test("Shoulld log in case of error", async () => {

    mockEmailService.sendEmailWithFileSysmtemLogs.mockReturnValue(false);

    const result = await sendEmail.execute("test@test.com");
    expect(result).toBeFalsy();
    expect(mockEmailService.sendEmailWithFileSysmtemLogs).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createAt: expect.any(Date),
      level: LogSeverityLevel.high,
      message: "Error sending email logs to:test@test.com",
      origin: "send-email-logs.ts",
    });
  });
});
