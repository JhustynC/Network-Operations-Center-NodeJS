import nodemailer from "nodemailer";
import { EmailService, ISendMailOptions } from "./email-service";

describe("Email service", () => {
  const mockSendMail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  const emailOptions: ISendMailOptions = {
    to: "test@example.com",
    subject: "Test email",
    text: "Test email body",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should send email", async () => {
    await emailService.sendEmail(emailOptions);
    expect(mockSendMail).toHaveBeenCalledWith(emailOptions);
  });

  test("Should send email with file system logs", async () => {
    await emailService.sendEmailWithFileSysmtemLogs("test@example.com");
    expect(mockSendMail).toHaveBeenCalledWith({
      to: "test@example.com",
      subject: "Logs del servidor",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        {
          filename: "logs-all.log",
          path: "./logs/logs-all.log",
        },
        {
          filename: "logs-medium.log",
          path: "./logs/logs-medium.log",
        },
        {
          filename: "logs-high.log",
          path: "./logs/logs-high.log",
        },
      ]),
    });
  });
});
