export interface jwtDtoProps {
  token: string;
}

export class jwtDto {
  public readonly token: string;

  private constructor(token: string) {
    this.token = token;
  }

  static create(
    props: jwtDtoProps
  ): [string | null, jwtDto | null] {
    const { token } = props;

    if (!token || typeof token !== "string" || token.trim().length === 0) {
      return ["Invalid token", null];
    }

    return [null, new jwtDto(token)];
  }
}
