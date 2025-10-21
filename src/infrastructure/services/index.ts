import { EmailService } from "./email.service";
import { NodemailerAdapter } from "../../config/email.pluggin";
let adapter: any;

const provider = (process.env.EMAIL_PROVIDER || "nodemailer").toLowerCase();

if (provider === "sendgrid") {
  // lazy require so package optional
  const { SendgridAdapter } = require("../adapters/sendgrid.adapter");
  adapter = new SendgridAdapter();
} else {
  adapter = new NodemailerAdapter();
}

export const emailService = new EmailService(adapter);


export { EmailService } from "./email.service";
