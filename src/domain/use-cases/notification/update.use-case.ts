import { NotificationModel } from "../../../data/mogodb";
import { UpdateNotificationDto } from "../../../domain/dtos";
import { NotificationEntity, CustomError } from "../../../domain";

export const updateNotificationUseCase = async (
  id: string,
  dto: UpdateNotificationDto
): Promise<NotificationEntity> => {
  const doc = await NotificationModel.findByIdAndUpdate(id, dto, { new: true });
  if (!doc) throw CustomError.notFound(`Notification with id ${id} not found`);

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
