import { NotificationModel } from "../../data/mogodb";
import { NotificationDataSource, NotificationEntity } from "../../domain";
import { CreateNotificationDto } from "../../domain/dtos/notification/createNotification.dto";
import { GetAllUserNotificationDto } from "../../domain/dtos/notification/getAllUserNotification";
import { UpdateNotificationDto } from "../../domain/dtos/notification/updateNotification.dto";
import { NotificationMapper } from "../mappers/notification.mapper"

export class NotificationDataSourceImpl implements NotificationDataSource {

  async createNotification(dto: CreateNotificationDto): Promise<NotificationEntity> {
    const doc = await NotificationModel.create({
      userId: dto.userId,
      title: dto.title,
      message: dto.message,
      type: dto.type,
      isRead: false,
    });

    return NotificationMapper.toEntity(doc);
  }

  async updateNotification(id: string, dto: UpdateNotificationDto): Promise<NotificationEntity> {
    const doc = await NotificationModel.findByIdAndUpdate(id, dto, { new: true });
    if (!doc) {
      throw new Error(`Notification with id ${id} not found`);
    }
    return NotificationMapper.toEntity(doc);
  }

  async getAllNotifications(): Promise<NotificationEntity | NotificationEntity[]> {
    const docs = await NotificationModel.find().sort({ createdAt: -1 });
    return NotificationMapper.toEntities(docs);
  }

  async getAllUserNotifications(dto: GetAllUserNotificationDto): Promise<NotificationEntity | NotificationEntity[]> {
    const docs = await NotificationModel.find({ userId: dto.userId }).sort({ createdAt: -1 });
    return NotificationMapper.toEntities(docs);
  }
}
