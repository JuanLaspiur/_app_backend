export class UpdateDepartmentDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly manager?: string,
    public readonly location?: string,
    public readonly teams?: { name: string; members: string[] }[]
  ) {}

  static create(object: any): [string?, UpdateDepartmentDto?] {
    const { id, name, manager, location, teams } = object;

    if (!id) return ["El ID del departamento es obligatorio para actualizar"];

    return [
      undefined,
      new UpdateDepartmentDto(id, name, manager, location, teams ?? []),
    ];
  }
}
