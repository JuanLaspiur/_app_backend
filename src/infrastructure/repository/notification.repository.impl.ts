import { NotificationDataSource, NotificationEntity, NotificationRepository } from "../../domain";
import { CreateNotificationDto } from "../../domain/dtos/notification/createNotification.dto";
import { GetAllUserNotificationDto } from "../../domain/dtos/notification/getAllUserNotification";
import { UpdateNotificationDto } from "../../domain/dtos/notification/updateNotification.dto";


export class NotificationRepositoryImpl implements NotificationRepository {

    constructor(private readonly notificationDataSource: NotificationDataSource) { }
   

    createNotification(dto: CreateNotificationDto): Promise<NotificationEntity> {
        return this.notificationDataSource.createNotification(dto);
    }
    updateNotification(id: string, dto: UpdateNotificationDto): Promise<NotificationEntity> {
        return this.notificationDataSource.updateNotification(id, dto);
    }
     getAllNotifications(): Promise<NotificationEntity | NotificationEntity[]> {
         return this.notificationDataSource.getAllNotifications();
    }
    getAllUserNotifications(dto: GetAllUserNotificationDto): Promise<NotificationEntity | NotificationEntity[]> {
        return this.notificationDataSource.getAllUserNotifications(dto);
    }
}