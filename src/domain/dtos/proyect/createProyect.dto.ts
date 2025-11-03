import { ProyectStatusType, ProyectPriorityType } from "../../../data/mogodb/models/proyect.model";

export class CreateProyectDto {
  constructor(
    public readonly teamId: string,
    public readonly name: string,
    public readonly description?: string,
    public readonly status?: ProyectStatusType,
    public readonly startDate?: Date,
    public readonly estimatedDeliveryDate?: Date | null,
    public readonly endDate?: Date | null,
    public readonly priority?: ProyectPriorityType,
    public readonly budget?: number | null,
    public readonly tags?: string[],
  ) {}


  static create(object: any): [string?, CreateProyectDto?] {
    if (!object.teamId) return ["teamId is required"];
    if (!object.name) return ["name is required"];

    const dto = new CreateProyectDto(
      object.teamId,
      object.name,
      object.description,
      object.status,
      object.startDate,
      object.estimatedDeliveryDate,
      object.endDate,
      object.priority,
      object.budget,
      object.tags
    );

    return [undefined, dto];
  }
}
