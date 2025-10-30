import { NotificationModel } from "../../../data/mogodb";
import { CreateNotificationDto } from "../../../domain/dtos";
import { NotificationEntity } from "../../../domain";

export const createNotificationUseCase = async (dto: CreateNotificationDto): Promise<NotificationEntity> => {
  const doc = await NotificationModel.create({
    userId: dto.userId,
    title: dto.title,
    message: dto.message,
    type: dto.type,
    isRead: false,
  });

  return {
    id: doc._id.toString(),
    userId: doc.userId,
    title: doc.title,
    message: doc.message,
    type: doc.type,
    isRead: doc.isRead,
    createdAt: doc.createdAt,
  };
};
