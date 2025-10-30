import { CustomError, NotificationDataSource, NotificationEntity } from "../../domain";
import { jwtDto, CreateNotificationDto, UpdateNotificationDto } from "../../domain/dtos";
import { NotificationMapper } from "../mappers/notification.mapper";
import * as notificationUseCases from "../../domain/use-cases/notification";

export class NotificationDataSourceImpl implements NotificationDataSource {
  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) {}

  private authorize(dto: jwtDto) {
    const userId = this.verifyToken(dto);
    if (!userId) throw CustomError.unauthorized("unauthorized: invalid token");
    return userId;
  }

  async createNotification(dto: CreateNotificationDto): Promise<NotificationEntity> {
    try {
      const notification = await notificationUseCases.createNotificationUseCase(dto);
      return NotificationMapper.toEntity(notification);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateNotification(id: string, dto: UpdateNotificationDto): Promise<NotificationEntity> {
    try {
      const notification = await notificationUseCases.updateNotificationUseCase(id, dto);
      return NotificationMapper.toEntity(notification);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateNotificationsStatusJWT(updateStatusDto: jwtDto): Promise<NotificationEntity[]> {
    try {
      const userId = this.authorize(updateStatusDto);
      const notifications = await notificationUseCases.updateUserNotificationsStatusUseCase(userId);
      return NotificationMapper.toEntities(notifications);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllNotifications(): Promise<NotificationEntity[]> {
    try {
      const notifications = await notificationUseCases.getAllNotificationsUseCase();
      return NotificationMapper.toEntities(notifications);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllUserNotifications(dto: jwtDto): Promise<NotificationEntity[]> {
    try {
      const userId = this.authorize(dto);
      const notifications = await notificationUseCases.getUserNotificationsUseCase(userId);
      return NotificationMapper.toEntities(notifications);
    } catch (error) {
      this.handleError(error);
    }
  }
}
