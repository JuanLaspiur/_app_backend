import { envs } from "../../config/env";

export class EmailService {
  constructor(private adapter: any) {}

  async sendEmail(to: string, subject: string, text?: string, html?: string): Promise<void> {
    return this.adapter.sendEmail(to, subject, text, html);
  }

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const link = `${envs.APP_URL}/verify-email?token=${encodeURIComponent(token)}`;
    const html = `<p>Please verify your email by clicking <a href="${link}">this link</a>.</p>`;
    const text = `Verify your email: ${link}`;
    return this.sendEmail(to, "Verify your email", text, html);
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const html = `<h1>Welcome ${name}</h1><p>Thanks for joining!</p>`;
    return this.sendEmail(to, "Welcome!", undefined, html);
  }
}
