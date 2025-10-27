export class UpdateTeamDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly members?: string[],
  ) {}

  static create(object: any): [string?, UpdateTeamDto?] {
    const { id, name, members } = object;

    if (!id) return ["El ID del team es obligatorio para actualizar"];

   const uniqueMembers: string[] | undefined = members
      ? Array.from(
          new Set<string>(
            members.filter((m:string): m is string => typeof m === "string" && m.trim() !== "")
          )
        )
      : undefined;
    return [
      undefined,
      new UpdateTeamDto(id, name, uniqueMembers),
    ];
  }
}