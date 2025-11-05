import { TrelloTaskModel } from "../../../data/mogodb/";
import { UpdateMemberTaskDto } from "../../dtos";

export class AddMember {
  static async execute(updateMember: UpdateMemberTaskDto) {
    const { taskId, memberId } = updateMember;
    return TrelloTaskModel.findByIdAndUpdate(
      taskId,
      { $addToSet: { assignees: memberId } },
      { new: true }
    ).lean();
  }
}
