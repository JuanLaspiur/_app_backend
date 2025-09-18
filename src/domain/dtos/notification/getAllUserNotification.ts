
export interface GetAllUserNotificationDtoProps {
  userId: string;
}

export class GetAllUserNotificationDto {
  private constructor(public readonly userId: string) {}

  static create(
    props: GetAllUserNotificationDtoProps
  ): [string | null, GetAllUserNotificationDto | null] {
    const { userId } = props;

    if (!userId || userId.trim().length === 0) {
      return ["userId is required", null];
    } 

    return [null, new GetAllUserNotificationDto(userId)];
  }
}
