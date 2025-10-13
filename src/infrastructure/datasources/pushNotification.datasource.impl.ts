import { PushNotificationModel } from "../../data/mogodb";
import { PushNotificationDatasource, PushNotificationEntity } from "../../domain";
import { jwtDto, SaveTokenDto, SendNotificationDto } from "../../domain/dtos";
import { PushNotificationMapper } from "../index";

export class PushNotificationDataSourceImpl implements PushNotificationDatasource {
  constructor(private readonly verifyToken: (dto: jwtDto) => string) {}

  async saveToken(dto: jwtDto, saveTokenDto: SaveTokenDto): Promise<PushNotificationEntity> {
    const userId = this.verifyToken(dto);
    const { token, platform } = saveTokenDto;
    const existing = await PushNotificationModel.findOne({ userId, token });
    if (existing) {
      return PushNotificationMapper.toEntity(existing);
    }
    const created = await PushNotificationModel.create({
      userId,
      token,
      platform,
    });

    return PushNotificationMapper.toEntity(created);
  }

  async getTokensByUser(dto: jwtDto): Promise<PushNotificationEntity> {
    const userId = this.verifyToken(dto);
    const tokenDoc = await PushNotificationModel.findOne({ userId })
      .sort({ updatedAt: -1 });

    if (!tokenDoc) {
      throw new Error("No push token found for this user");
    }
    return PushNotificationMapper.toEntity(tokenDoc);
  }

  async sendNotification(sendNotificationDto: SendNotificationDto): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
