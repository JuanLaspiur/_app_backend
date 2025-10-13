import jwt from "jsonwebtoken";
import { NotificationModel } from "../../data/mogodb";
import { NotificationDataSource, NotificationEntity } from "../../domain";
import { jwtDto, CreateNotificationDto, UpdateNotificationDto } from "../../domain/dtos";
import { NotificationMapper } from "../mappers/notification.mapper";

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
  async updateNotificationsStatusJWT(updateStatusDto: jwtDto): Promise<NotificationEntity[]> {
    let payload: any;
    try {
      payload = jwt.verify(updateStatusDto.token!, process.env.JWT_SECRET!);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }

    const userId = payload.id || payload.userId;
    if (!userId) {
      throw new Error("Invalid token payload: missing user id");
    }

    await NotificationModel.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );

    const docs = await NotificationModel.find({ userId }).sort({ createdAt: -1 });

    return NotificationMapper.toEntities(docs);
  }


  async getAllNotifications(): Promise<NotificationEntity | NotificationEntity[]> {
    const docs = await NotificationModel.find().sort({ createdAt: -1 });
    return NotificationMapper.toEntities(docs);
  }
  /*
    async getAllUserNotifications(dto: jwtDto): Promise<NotificationEntity | NotificationEntity[]> {
      const docs = await NotificationModel.find({ userId: dto.userId }).sort({ createdAt: -1 });
      return NotificationMapper.toEntities(docs);
    } */
}
