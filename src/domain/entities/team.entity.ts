import { ProyectEntity } from "./proyect.entity";
import { TeamMemberEntity } from "./teamMember.entity";

export class TeamEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly members: string[] | TeamMemberEntity[] = [],
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
    public readonly projects: string[] | ProyectEntity[] = [],
  ) { }
}
