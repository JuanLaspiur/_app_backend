export class TeamEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly members: string[] = [],
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}
}
