import { NodemailerAdapter } from "../../config/email.pluggin";

export class EmailService {
  private adapter: any;

  constructor(adapter?: any) {
    this.adapter = adapter ?? new NodemailerAdapter();
  }

  async sendEmail(to: string, subject: string, text?: string, html?: string): Promise<void> {
    return this.adapter.sendEmail(to, subject, text, html);
  }
}
