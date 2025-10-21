import { User } from "../../../types/user";

export class TeamEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly members: string[] | User[] = [], 
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}
}
