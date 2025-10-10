
export interface SendNotificationDtoProps {
  token: string;
  title: string;
  body: string;
}

export class SendNotificationDto {
  private constructor(
    public readonly token: string,
    public readonly title: string,
    public readonly body: string,
  ) {}

  static create(props: SendNotificationDtoProps): [string | null, SendNotificationDto | null] {
    const { token, title, body } = props;

    // Validaciones
    if (!token || typeof token !== "string" || token.trim().length === 0) {
      return ["Token is required and must be a non-empty string", null];
    }

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return ["Title is required and must be a non-empty string", null];
    }

    if (!body || typeof body !== "string" || body.trim().length === 0) {
      return ["Body is required and must be a non-empty string", null];
    }

    const dto = new SendNotificationDto(token.trim(), title.trim(), body.trim());
    return [null, dto];
  }
}
