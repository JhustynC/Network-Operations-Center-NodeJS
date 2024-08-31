import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import fs from "fs";
import Mail from "nodemailer/lib/mailer";
import { AbsLogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export interface ISendMailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: Mail.Attachment[];
}

// console.log(envs); //
export class EmailService {
  private pathsHtmlEmailTemplates = new Map<string, string>([
    ["t1", "./src/presentation/email/email-templates/email-template1.html"],
    ["t2", "./src/presentation/email/email-templates/email-template2.html"],
  ]);

  private mailer = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL, // Tu dirección de correo de Gmail
      pass: envs.MAILER_SECRET_KEY, // La contraseña de tu cuenta de Gmail o app password
    },
  });

  constructor() {}

  async sendEmail(options: ISendMailOptions): Promise<boolean> {
    try {
      const sentInforamtion = await this.mailer.sendMail(options);
      console.log(sentInforamtion);
      return true;
    } catch (err) {
      console.error(`Error al enviar el correo: ${err}`);
      return false;
    }
  }

  async sendEmailWithFileSysmtemLogs(to: string | string[]): Promise<boolean> {
    const subject = "Logs del servidor";
    const html = this.getHtmlEmailTemplates("Albelyka");
    const attachments: Mail.Attachment[] = [
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
    ];
    // content: fs.readFileSync(path.join(__dirname, "../../logs/logs-all.log"), "utf8"),
    return this.sendEmail({ to, subject, html, attachments });
  }

  //Implementar métodos para adjuntar cuerpos HTML
  public getHtmlEmailTemplates(
    to: string,
    htmlTemplateOption: string = "t2"
  ): string {
    try {
      let htmlTemplate = fs.readFileSync(
        this.pathsHtmlEmailTemplates.get(htmlTemplateOption)!,
        "utf8"
      );

      // Reemplaza la variable [Nombre] en la plantilla con el valor de 'to'
      htmlTemplate = htmlTemplate.replace(/\[Nombre\]/g, to);

      return htmlTemplate;
    } catch (err) {
      throw new Error(`Error al leer o procesar la plantilla HTML: ${err}`);
    }
  }
}
