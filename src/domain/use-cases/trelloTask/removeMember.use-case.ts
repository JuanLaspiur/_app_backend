import { TrelloTaskModel } from "../../../data/mogodb/";
import { UpdateMemberTaskDto } from "../../dtos";

export class RemoveMember {
  static async execute(updateMember: UpdateMemberTaskDto) {
    const { taskId, memberId } = updateMember;
    return TrelloTaskModel.findByIdAndUpdate(
      taskId,
      { $pull: { assignees: memberId } }, 
      { new: true }
    ).lean(); 
  }
}
