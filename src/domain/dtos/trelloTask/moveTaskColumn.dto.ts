export class MoveTaskColumnDto {
  private constructor(
    public readonly taskId: string,
     public readonly newColumnId: string) {}

  static create(object: any): [string?, MoveTaskColumnDto?] {
    if (!object?.taskId || !object?.newColumnId) {
      return ["taskId or newColumnId is missing"];
    }
    return [undefined, new MoveTaskColumnDto(object.taskId, object.newColumnId)];
  }
}
