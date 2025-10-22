export class RemoveMemberDto {
  constructor(
    public readonly teamId: string,
    public readonly teamMemberId: string
  ) {}

  static create(object: any): [string?, RemoveMemberDto?] {
    if (!object) return ["No object provided"];

    const { teamId, teamMemberId } = object;

    if (!teamId || typeof teamId !== "string") {
      return ["teamId is required and must be a string"];
    }

    if (!teamMemberId || typeof teamMemberId !== "string") {
      return ["userId is required and must be a string"];
    }

    return [undefined, new RemoveMemberDto(teamId, teamMemberId)];
  }
}
