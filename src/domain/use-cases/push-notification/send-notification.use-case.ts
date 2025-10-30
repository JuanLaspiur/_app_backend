import { SendNotificationDto } from "../../dtos";

export class SendNotificationUseCase {
  async execute(sendNotificationDto: SendNotificationDto): Promise<void> {
    // Aquí iría la lógica real de envío con FCM, OneSignal, Expo, etc.
    throw new Error("Send notification logic not implemented yet.");
  }
}
