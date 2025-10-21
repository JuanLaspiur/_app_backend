
export class CreateTeamDto {
  constructor(
    public readonly departmentId: string,
    public readonly name: string,
    public readonly members: string[],
  ) {}

  static create(object: any): [string?, CreateTeamDto?] {
    if (!object) return ["No object provided"];

    const { departmentId, name, members } = object;

    if (!departmentId || typeof departmentId !== "string") {
      return ["The 'departmentId' field is required and must be a string"];
    }

    if (!name || typeof name !== "string") {
      return ["The 'name' field is required and must be a string"];
    }

    if (!Array.isArray(members)) {
      return ["The 'members' field must be an array of strings"];
    }

    if (!members.every((m) => typeof m === "string")) {
      return ["All team members must be strings"];
    }

    return [undefined, new CreateTeamDto(departmentId, name, members)];
  }
}
