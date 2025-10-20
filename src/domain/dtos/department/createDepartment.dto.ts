export class CreateDepartmentDto {
  constructor(
    public readonly name: string,
    public readonly manager: string,
    public readonly location?: string,
    public readonly teams?: { name: string; members: string[] }[]
  ) {}

  static create(object: any): [string?, CreateDepartmentDto?] {
    const { name, manager, location, teams } = object;

    if (!name) return ["El nombre del departamento es requerido"];
    if (!manager) return ["El encargado (manager) es requerido"];

    return [
      undefined,
      new CreateDepartmentDto(name, manager, location, teams ?? []),
    ];
  }
}
