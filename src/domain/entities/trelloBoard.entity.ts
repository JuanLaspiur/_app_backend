export type TrelloTaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export class TrelloTaskEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string = "",
    public readonly assignees: string[] = [],
    public readonly dueDate: Date | null = null,
    public readonly status: TrelloTaskStatus = "TODO",
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}
}

export class TrelloColumnEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly tasks: TrelloTaskEntity[] = [],
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}
}

export class TrelloBoardEntity {
  constructor(
    public readonly id: string,
    public readonly projectId: string,
    public readonly teamId: string,
    public readonly columns: TrelloColumnEntity[],
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}
}
