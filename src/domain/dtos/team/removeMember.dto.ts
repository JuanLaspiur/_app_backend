export class RemoveMemberDto {
  constructor(
    public readonly teamId: string,
    public readonly userId: string
  ) {}

  static create(object: any): [string?, RemoveMemberDto?] {
    if (!object) return ["No object provided"];

    const { teamId, userId } = object;

    if (!teamId || typeof teamId !== "string") {
      return ["teamId is required and must be a string"];
    }

    if (!userId || typeof userId !== "string") {
      return ["userId is required and must be a string"];
    }

    return [undefined, new RemoveMemberDto(teamId, userId)];
  }
}
