import { NotificationModel } from "../../data/mogodb";
import { CustomError, NotificationDataSource, NotificationEntity } from "../../domain";
import { jwtDto, CreateNotificationDto, UpdateNotificationDto } from "../../domain/dtos";
import { NotificationMapper } from "../mappers/notification.mapper";

export class NotificationDataSourceImpl implements NotificationDataSource {

  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) {}

  async createNotification(dto: CreateNotificationDto): Promise<NotificationEntity> {
    try {
      const doc = await NotificationModel.create({
        userId: dto.userId,
        title: dto.title,
        message: dto.message,
        type: dto.type,
        isRead: false,
      });

      return NotificationMapper.toEntity(doc);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateNotification(id: string, dto: UpdateNotificationDto): Promise<NotificationEntity> {
    try {
      const doc = await NotificationModel.findByIdAndUpdate(id, dto, { new: true });
      if (!doc) throw CustomError.notFound(`Notification with id ${id} not found`);

      return NotificationMapper.toEntity(doc);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateNotificationsStatusJWT(updateStatusDto: jwtDto): Promise<NotificationEntity[]> {
    try {
      const userId = this.verifyToken(updateStatusDto);

      await NotificationModel.updateMany(
        { userId, isRead: false },
        { $set: { isRead: true } }
      );

      const docs = await NotificationModel.find({ userId }).sort({ createdAt: -1 }).lean();
      return NotificationMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllNotifications(): Promise<NotificationEntity[]> {
    try {
      const docs = await NotificationModel.find().sort({ createdAt: -1 }).lean();
      return NotificationMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllUserNotifications(dto: jwtDto): Promise<NotificationEntity[]> {
    try {
      const userId = this.verifyToken(dto);

      const docs = await NotificationModel.find({ userId }).sort({ createdAt: -1 }).lean();
      return NotificationMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }
}
