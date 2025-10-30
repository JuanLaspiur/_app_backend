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
     if (!userId) throw CustomError.unauthorized("unauthorized: invalid authtoken");
    return userId;
  }

  async createNotification(dto: CreateNotificationDto): Promise<NotificationEntity> {
    try {
      const doc = await notificationUseCases.Create.execute(dto);
      return NotificationMapper.toEntity(doc);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateNotification(id: string, dto: UpdateNotificationDto): Promise<NotificationEntity> {
    try {
      const doc = await notificationUseCases.Update.execute(id, dto);
      return NotificationMapper.toEntity(doc);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateNotificationsStatusJWT(updateStatusDto: jwtDto): Promise<NotificationEntity[]> {
    try {
      const userId = this.authorize(updateStatusDto);
      const docs = await notificationUseCases.UpdateStatus.execute(userId);
      return NotificationMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllNotifications(): Promise<NotificationEntity[]> {
    try {
      const docs = await notificationUseCases.GetAll.execute();
      return NotificationMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllUserNotifications(dto: jwtDto): Promise<NotificationEntity[]> {
    try {
      const userId = this.authorize(dto);
      const docs = await notificationUseCases.GetAllByUserId.execute(userId);
      return NotificationMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }
}
