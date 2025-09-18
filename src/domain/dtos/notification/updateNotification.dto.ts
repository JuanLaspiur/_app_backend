import { NotificationType } from "../../entities/notification.entity";

export interface UpdateNotificationDtoProps {
  userId?: string;
  title?: string;
  message?: string;
  type?: NotificationType; 
  isRead?:boolean;
}

export class UpdateNotificationDto {
  constructor(
    public readonly userId?: string,
    public readonly title?: string,
    public readonly message?: string,
    public readonly type?: NotificationType,
    public readonly isRead?: boolean,
  ) {}

  static create(props: UpdateNotificationDtoProps): UpdateNotificationDto {
    return new UpdateNotificationDto(
      props.userId,
      props.title,
      props.message,
      props.type,
      props.isRead
    );
  }
}

