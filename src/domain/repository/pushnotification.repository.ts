
import { jwtDto, SaveTokenDto, SendNotificationDto } from "../dtos";
import { PushNotificationEntity } from "../entities/pushNotification.entity";

export interface PushNotificationRepository {
  saveToken(dto:jwtDto, saveTokenDto: SaveTokenDto): Promise<PushNotificationEntity>;
  getTokensByUser(dto: jwtDto): Promise<PushNotificationEntity>;
  sendNotification(sendNotificationDto: SendNotificationDto): Promise<void>;
}
