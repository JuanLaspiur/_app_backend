import { TrelloTaskPriority } from "../../data/mogodb";


export class TrelloTaskEntity {
  constructor(
    public readonly id: string,
    public readonly boardId: string,
    public readonly columnId: string,
    public readonly title: string,
    public readonly description?: string,
    public readonly assignees?: string[],
    public readonly labels?: string[],
    public readonly priority: TrelloTaskPriority = TrelloTaskPriority.MEDIUM,
    public readonly dueDate?: Date,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}