import { EmailService } from "./email.service";
import { NodemailerAdapter } from "../../config/email.pluggin";
import { envs } from "../../config/env";
let adapter: any;

const provider = (envs.EMAIL_PROVIDER || "nodemailer").toLowerCase();

if (provider === "sendgrid") {
  const { SendgridAdapter } = require("../adapters/sendgrid.adapter");
  adapter = new SendgridAdapter();
} else {
  adapter = new NodemailerAdapter();
}

export const emailService = new EmailService(adapter);


export { EmailService } from "./email.service";
