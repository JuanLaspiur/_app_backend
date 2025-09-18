import { NotificationType } from "../../entities/notification.entity";

export interface CreateNotificationDtoProps {
  userId: string;
  title: string;
  message: string;
  type: NotificationType; 
}

export class CreateNotificationDto {
  private constructor(
    public readonly userId: string,
    public readonly title: string,
    public readonly message: string,
    public readonly type: NotificationType,
  ) {}

  static create(props: CreateNotificationDtoProps): [string | null, CreateNotificationDto | null] {
    const { userId, title, message, type } = props;

    if (!userId || userId.trim().length === 0) {
      return ["userId is required", null];
    }
    if (!title || title.trim().length === 0) {
      return ["title is required", null];
    }
    if (!message || message.trim().length === 0) {
      return ["message is required", null];
    }
    if (!["info", "warning", "success", "error"].includes(type)) {
      return [`Invalid notification type: ${type}`, null];
    }

    return [null, new CreateNotificationDto(userId, title, message, type)];
  }
}
