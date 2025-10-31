import { SendNotificationDto } from "../../dtos";

export class SendNotification {
 static async execute(sendNotificationDto: SendNotificationDto): Promise<void> {
    throw new Error("Send notification logic not implemented yet.");
  }
}
