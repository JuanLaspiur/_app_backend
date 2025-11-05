export class UpdateMemberTaskDto {
  private constructor(public readonly taskId: string, public readonly memberId: string) {}

  static create(object: any): [string?, UpdateMemberTaskDto?] {
    if (!object?.taskId || !object?.memberId) {
      return ["taskId or memberId is missing"];
    }
    return [undefined, new UpdateMemberTaskDto(object.taskId, object.memberId)];
  }
}
