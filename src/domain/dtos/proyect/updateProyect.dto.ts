import { ProyectStatusType, ProyectPriorityType, ProyectStatus, ProyectPriority } from "../../../data/mogodb/models/proyect.model";

export class UpdateProyectDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly description?: string,
    public readonly status?: ProyectStatusType,
    public readonly estimatedDeliveryDate?: Date | null,
    public readonly endDate?: Date | null,
    public readonly priority?: ProyectPriorityType,
    public readonly budget?: number | null,
    public readonly tags?: string[]
  ) {}

  /**
   * Crea un UpdateProyectDto validado
   * @param object cualquier objeto con datos
   * @returns [error?, dto?]
   */
  static create(object: any): [string?, UpdateProyectDto?] {
    if (!object.id) return ["id is required"];

    if (object.status && !Object.values(ProyectStatus).includes(object.status)) {
      return [`Invalid status. Allowed: ${Object.values(ProyectStatus).join(", ")}`];
    }

    if (object.priority && !Object.values(ProyectPriority).includes(object.priority)) {
      return [`Invalid priority. Allowed: ${Object.values(ProyectPriority).join(", ")}`];
    }

    const dto = new UpdateProyectDto(
      object.id,
      object.name,
      object.description,
      object.status,
      object.estimatedDeliveryDate,
      object.endDate,
      object.priority,
      object.budget,
      object.tags
    );

    return [undefined, dto];
  }
}
