import { User } from "../../../types/user";

export class TeamMemberEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string | User,
    public readonly position: string,
    public readonly roleLevel: string,
    public readonly salary: number,
    public readonly jobDescription?: string,
    public readonly startDate: Date = new Date()
  ) {}
}
