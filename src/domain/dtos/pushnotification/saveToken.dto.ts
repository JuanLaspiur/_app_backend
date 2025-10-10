import { Platform } from "../../entities/pushNotification.entity";

export interface SaveTokenDtoProps {
  token: string;
  platform?: Platform;
}

export class SaveTokenDto {
  private constructor(
    public readonly token: string,
    public readonly platform?: Platform
  ) {}

  static create(props: SaveTokenDtoProps): [string | null, SaveTokenDto | null] {
    const { token, platform } = props;

    if (!token || typeof token !== "string" || token.trim().length === 0) {
      return ["Token is required and must be a non-empty string", null];
    }

    if (platform && !["ios", "android", "web"].includes(platform)) {
      return [`Invalid platform '${platform}'. Must be 'ios', 'android' or 'web'`, null];
    }

    const dto = new SaveTokenDto(token, platform);
    return [null, dto];
  }
}
