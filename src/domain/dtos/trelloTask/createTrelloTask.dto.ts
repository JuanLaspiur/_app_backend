import { TrelloTaskPriority } from "../../../data/mogodb";

export class CreateTrelloTaskDto {
  private constructor(
    public readonly boardId: string,
    public readonly columnId: string,
    public readonly title: string,
    public readonly description?: string,
    public readonly assignees?: string[],
    public readonly labels?: string[],
    public readonly priority: TrelloTaskPriority = TrelloTaskPriority.MEDIUM,
    public readonly dueDate?: Date
  ) {}

  static create(object: any): [string?, CreateTrelloTaskDto?] {
     
    // --- Basic validations ---
    if (!object.boardId) return ["'boardId' is required"];
    if (!object.columnId) return ["'columnId' is required"];
    if (!object.title || typeof object.title !== "string" || object.title.trim().length === 0)
      return ["'title' must be a valid non-empty string"];

    if (object.priority && !Object.values(TrelloTaskPriority).includes(object.priority))
      return ["'priority' is not a valid value"];

    let parsedDueDate: Date | undefined;
    if (object.dueDate) {
      const d = new Date(object.dueDate);
      if (isNaN(d.getTime())) return ["'dueDate' has an invalid format"];
      parsedDueDate = d;
    }

    const dto = new CreateTrelloTaskDto(
      object.boardId,
      object.columnId,
      object.title.trim(),
      object.description,
      Array.isArray(object.assignees) ? object.assignees : [],
      Array.isArray(object.labels) ? object.labels : [],
      object.priority || TrelloTaskPriority.MEDIUM,
      parsedDueDate
    );

    return [undefined, dto];
  }
}
