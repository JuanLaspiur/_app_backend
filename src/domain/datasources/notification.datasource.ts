import { CreateNotificationDto } from '../dtos/notification/createNotification.dto';
import { GetAllUserNotificationDto } from '../dtos/notification/getAllUserNotification';
import { UpdateNotificationDto } from '../dtos/notification/updateNotification.dto';
import { NotificationEntity } from '../entities/notification.entity';

export abstract class NotificationDataSource {
    abstract createNotification(createDto:CreateNotificationDto):Promise<NotificationEntity>
    abstract updateNotification(id:string, updateDto:UpdateNotificationDto):Promise<NotificationEntity> // TO-DO token
    abstract getAllNotifications():Promise<NotificationEntity | NotificationEntity[]>
    abstract getAllUserNotifications(dto:GetAllUserNotificationDto):Promise<NotificationEntity | NotificationEntity[]> // TO-DO token

}