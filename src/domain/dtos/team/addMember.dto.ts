export class AddMemberDto {
  constructor(
    public readonly teamId: string,
    public readonly userId: string
  ) {}

  static create(object: any): [string?, AddMemberDto?] {
    if (!object) return ["No object provided"];

    const { teamId, userId } = object;

    if (!teamId || typeof teamId !== "string") {
      return ["teamId is required and must be a string"];
    }

    if (!userId || typeof userId !== "string") {
      return ["userId is required and must be a string"];
    }

    return [undefined, new AddMemberDto(teamId, userId)];
  }
}
