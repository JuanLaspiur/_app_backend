import { TrelloTaskEntity } from "../../domain";
import { TrelloTaskPriority } from "../../data/mogodb";

export class TrelloTaskMapper {
 
  static toEntity(raw: any): TrelloTaskEntity {
    if (!raw) throw new Error("Cannot map undefined TrelloTask document");

    return new TrelloTaskEntity(
      raw.id ?? raw.id?.toString(),
      raw.boardId?.toString(),
      raw.columnId?.toString(),
      raw.title,
      raw.description,
      Array.isArray(raw.assignees)
        ? raw.assignees.map((a: any) =>
            typeof a === "object" ? a.id ?? a.id?.toString() : a
          )
        : [],
      Array.isArray(raw.labels) ? raw.labels : [],
      raw.priority ?? TrelloTaskPriority.MEDIUM,
      raw.dueDate ? new Date(raw.dueDate) : undefined,
      raw.createdAt ? new Date(raw.createdAt) : undefined,
      raw.updatedAt ? new Date(raw.updatedAt) : undefined
    );
  }

  static toEntities(raws: any[]): TrelloTaskEntity[] {
    if (!Array.isArray(raws))
      throw new Error("Expected an array in TrelloTaskMapper.toEntities()");
    return raws.map((raw) => this.toEntity(raw));
  }
}
