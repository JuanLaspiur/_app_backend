import { PushNotificationEntity } from "../entities/pushNotification.entity";
import { jwtDto, SaveTokenDto, SendNotificationDto } from "../dtos";

export interface PushNotificationDatasource {
  saveToken(dto:jwtDto, saveTokenDto: SaveTokenDto): Promise<PushNotificationEntity>;
  getTokensByUser(dto: jwtDto): Promise<PushNotificationEntity>;
  sendNotification(sendNotificationDto: SendNotificationDto): Promise<void>;
}
