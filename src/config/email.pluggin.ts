import nodemailer from "nodemailer";
import { envs } from "./env";

export class NodemailerAdapter {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.SMTP_HOST,
      port: envs.SMTP_PORT || 587,
      secure: envs.SMTP_PORT === 465,
      auth: {
        user: envs.SMTP_USER,
        pass: envs.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, text?: string, html?: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"${envs.EMAIL_FROM_NAME || "My App"}" <${envs.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
  }
}
