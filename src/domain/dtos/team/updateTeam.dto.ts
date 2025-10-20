export class UpdateTeamDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly members?: string[],
  ) {}

  static create(object: any): [string?, UpdateTeamDto?] {
    const { id, name, members } = object;

    if (!id) return ["El ID del team es obligatorio para actualizar"];

    return [
      undefined,
      new UpdateTeamDto(id, name, members),
    ];
  }
}