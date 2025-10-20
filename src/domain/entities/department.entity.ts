import { TeamEntity } from "./team.entity";

export class DepartmentEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly manager: string,
    public readonly location?: string,
    public readonly teams: TeamEntity[] = [],
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}
}
