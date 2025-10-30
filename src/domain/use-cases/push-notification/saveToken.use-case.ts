import { PushNotificationModel } from "../../../data/mogodb";
import { SaveTokenDto } from "../../dtos";

export class SaveTokenUseCase {
  async execute(userId: string, { token, platform }: SaveTokenDto) {
    const existing = await PushNotificationModel.findOne({ userId, token });
    if (existing) return existing;

    const created = await PushNotificationModel.create({ userId, token, platform });
    return created;
  }
}
