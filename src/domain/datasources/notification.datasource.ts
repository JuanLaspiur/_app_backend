import { jwtDto, CreateNotificationDto, UpdateNotificationDto } from '../dtos/';
import { NotificationEntity } from '../entities/notification.entity';

export abstract class NotificationDataSource {
    abstract createNotification(createDto:CreateNotificationDto):Promise<NotificationEntity>
    abstract updateNotification(id:string, updateDto:UpdateNotificationDto):Promise<NotificationEntity>
    abstract updateNotificationsStatusJWT(dto:jwtDto):Promise<NotificationEntity[]>
    abstract getAllNotifications():Promise<NotificationEntity | NotificationEntity[]>
   // abstract getAllUserNotificationsJWT(dto:jwtDto):Promise<NotificationEntity[]> 

}