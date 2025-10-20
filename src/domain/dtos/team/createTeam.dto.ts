export class CreateTeamDto {
  constructor(
    public readonly name: string,
    public readonly members: string[],
  ) {}

  static create(object: any): [string?, CreateTeamDto?] {
    if (!object) return ["No se proporcionó ningún objeto"];

    const { name, members } = object;

    if (!name || typeof name !== "string") {
      return ["El nombre del equipo es obligatorio y debe ser un string"];
    }

    if (!Array.isArray(members)) {
      return ["Los miembros del equipo deben ser un array de strings"];
    }

    if (!members.every((m) => typeof m === "string")) {
      return ["Todos los miembros deben ser strings"];
    }

    return [undefined, new CreateTeamDto(name, members)];
  }
}
