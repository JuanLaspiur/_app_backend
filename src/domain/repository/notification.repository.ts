import { CreateNotificationDto } from '../dtos/notification/createNotification.dto';
import { UpdateNotificationDto } from '../dtos/notification/updateNotification.dto';
import { jwtDto } from '../dtos/jwt.dto';
import { NotificationEntity } from '../entities/notification.entity';

export abstract class NotificationRepository {
    abstract createNotification(createDto:CreateNotificationDto):Promise<NotificationEntity>
    abstract updateNotification(id:string, createDto:UpdateNotificationDto):Promise<NotificationEntity>  // TO-DO token
    abstract updateNotificationsStatusJWT(updateStatusDto:jwtDto ):Promise<NotificationEntity[]>
    abstract getAllNotifications():Promise<NotificationEntity | NotificationEntity[]>
 //   abstract getAllUserNotifications(dto:jwtDto):Promise<NotificationEntity | NotificationEntity[]>// TO-DO token

}