
export interface GetAllUserVacationDtoProps {
  userId: string;
}

export class GetAllUserVacationDto {
  private constructor(public readonly userId: string) {}

  static create(
    props: GetAllUserVacationDtoProps
  ): [string | null, GetAllUserVacationDto | null] {
    const { userId } = props;

    if (!userId || userId.trim().length === 0) {
      return ["userId is required", null];
    } 

    return [null, new GetAllUserVacationDto(userId)];
  }
}
