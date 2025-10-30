import { PushNotificationModel } from "../../../data/mogodb";
import { CustomError } from "../../errors/custom.error";

export class GetTokensByUserUseCase {
  async execute(userId: string) {
    const tokenDoc = await PushNotificationModel.findOne({ userId }).sort({ updatedAt: -1 });
    if (!tokenDoc) throw CustomError.notFound("No push token found for this user");
    return tokenDoc;
  }
}
