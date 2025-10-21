export class UpdateTeamMemberDto {
  constructor(
    public readonly id: string,
    public readonly userId?: string,
    public readonly position?: string,
    public readonly roleLevel?: string,
    public readonly salary?: number,
    public readonly jobDescription?: string,
  ) {}

  static create(object: any): [string?, UpdateTeamMemberDto?] {
    if (!object) return ["No object provided"];

    const { id, userId, position, roleLevel, salary, jobDescription } = object;

    if (!id || typeof id !== "string") {
      return ["The 'id' field is required and must be a string"];
    }

    if (userId && typeof userId !== "string") {
      return ["The 'userId' field must be a string"];
    }

    if (position && typeof position !== "string") {
      return ["The 'position' field must be a string"];
    }

    if (roleLevel && typeof roleLevel !== "string") {
      return ["The 'roleLevel' field must be a string"];
    }

    if (salary != null && typeof salary !== "number") {
      return ["The 'salary' field must be a number"];
    }

    if (jobDescription && typeof jobDescription !== "string") {
      return ["The 'jobDescription' field must be a string"];
    }

    return [undefined, new UpdateTeamMemberDto(id, userId, position, roleLevel, salary, jobDescription)];
  }
}
