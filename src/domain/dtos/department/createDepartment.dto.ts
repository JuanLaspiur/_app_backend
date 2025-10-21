
export class CreateDepartmentDto {
  constructor(
    public readonly name: string,
    public readonly manager: string,
    public readonly location?: string,
    public readonly teams?: { name: string; members: string[] }[]
  ) {}

  static create(object: any): [string?, CreateDepartmentDto?] {
    const { name, manager, location, teams } = object;

if (!name) return ["The department name ('name') is required"];
if (!manager) return ["The manager ('manager') is required"];
if (!location) return ["The location ('location') is required"];

    return [
      undefined,
      new CreateDepartmentDto(name, manager, location, teams ?? []),
    ];
  }
}
