import { NotificationType } from "../../entities/notification.entity";

export interface UpdateNotificationDtoProps {
  userId?: string;
  title?: string;
  message?: string;
  type?: NotificationType; 
  isRead?: boolean;
}

export class UpdateNotificationDto {
  constructor(
    public readonly userId?: string,
    public readonly title?: string,
    public readonly message?: string,
    public readonly type?: NotificationType,
    public readonly isRead?: boolean,
  ) {}

  static create(props: UpdateNotificationDtoProps): [string | null, UpdateNotificationDto | null] {
    if (!props) return ['Missing properties', null];

    const { userId, title, message, type, isRead } = props;

    if (
      userId === undefined &&
      title === undefined &&
      message === undefined &&
      type === undefined &&
      isRead === undefined
    ) {
      return ['At least one field must be provided to update the notification', null];
    }

    const dto = new UpdateNotificationDto(userId, title, message, type, isRead);
    return [null, dto];
  }
}
