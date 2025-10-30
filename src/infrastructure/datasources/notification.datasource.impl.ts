import { NotificationDataSource, NotificationEntity } from "../../domain";
import { jwtDto, CreateNotificationDto, UpdateNotificationDto } from "../../domain/dtos";
import { NotificationMapper } from "../mappers/notification.mapper";
import {
  createNotificationUseCase,
  updateNotificationUseCase,
  updateUserNotificationsStatusUseCase,
  getAllNotificationsUseCase,
  getUserNotificationsUseCase
} from "../../domain/use-cases/notification";

export class NotificationDataSourceImpl implements NotificationDataSource {
  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) {}

  /** Helper para verificar token */
  private authorize(dto: jwtDto) {
    const userId = this.verifyToken(dto);
    if (!userId) throw new Error("unauthorized: invalid token");
    return userId;
  }

  async createNotification(dto: CreateNotificationDto): Promise<NotificationEntity> {
    try {
      const doc = await createNotificationUseCase(dto);
      return NotificationMapper.toEntity(doc);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateNotification(id: string, dto: UpdateNotificationDto): Promise<NotificationEntity> {
    try {
      const doc = await updateNotificationUseCase(id, dto);
      return NotificationMapper.toEntity(doc);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateNotificationsStatusJWT(updateStatusDto: jwtDto): Promise<NotificationEntity[]> {
    try {
      const userId = this.authorize(updateStatusDto);
      const docs = await updateUserNotificationsStatusUseCase(userId);
      return NotificationMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllNotifications(): Promise<NotificationEntity[]> {
    try {
      const docs = await getAllNotificationsUseCase();
      return NotificationMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllUserNotifications(dto: jwtDto): Promise<NotificationEntity[]> {
    try {
      const userId = this.authorize(dto);
      const docs = await getUserNotificationsUseCase(userId);
      return NotificationMapper.toEntities(docs);
    } catch (error) {
      this.handleError(error);
    }
  }
}
