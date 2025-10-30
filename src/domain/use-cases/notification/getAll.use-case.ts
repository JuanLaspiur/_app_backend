import { NotificationModel } from "../../../data/mogodb";
import { NotificationEntity } from "../../../domain";

export const getAllNotificationsUseCase = async (): Promise<NotificationEntity[]> => {
  const docs = await NotificationModel.find().sort({ createdAt: -1 }).lean();
  return docs.map(doc => ({
    id: doc._id.toString(),
    userId: doc.userId,
    title: doc.title,
    message: doc.message,
    type: doc.type,
    isRead: doc.isRead,
    createdAt: doc.createdAt,
  }));
};
