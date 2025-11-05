import { ProyectStatusType, ProyectPriorityType } from "../../data/mogodb/models/proyect.model";

export class ProyectEntity {
  constructor(
    public readonly id: string,
    public readonly teamId: string,
    public readonly name: string,
    public readonly description: string = "",
    public readonly status: ProyectStatusType = "PENDING",
    public readonly startDate: Date = new Date(),
    public readonly estimatedDeliveryDate: Date | null = null,
    public readonly endDate: Date | null = null,
    public readonly priority: ProyectPriorityType = "MEDIUM",
    public readonly budget: number | null = null,
    public readonly tags: string[] = [],
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
    public readonly trelloBoardId: string | any
  ) {}
}
