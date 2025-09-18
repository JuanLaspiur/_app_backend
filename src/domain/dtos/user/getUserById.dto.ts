
export interface GetUserByIdDtoProps {
  userId: string;
}

export class GetUserByIdDto {
  private constructor(public readonly userId: string) {}

  static create(
    props: GetUserByIdDtoProps
  ): [string | null, GetUserByIdDto | null] {
    const { userId } = props;

    if (!userId || userId.trim().length === 0) {
      return ["userId is required", null];
    } 

    return [null, new GetUserByIdDto(userId)];
  }
}
