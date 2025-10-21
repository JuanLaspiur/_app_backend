import nodemailer from "nodemailer";

export class NodemailerAdapter {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, text?: string, html?: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || "My App"}" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
  }
}
