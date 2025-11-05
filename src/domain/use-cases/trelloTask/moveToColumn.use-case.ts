import { TrelloTaskModel } from "../../../data/mogodb/";
import { MoveTaskColumnDto } from "../../dtos";

export class MoveToColumn {
  static async execute(moveTaskColumnDto: MoveTaskColumnDto) {
    const { taskId, newColumnId } = moveTaskColumnDto;

    return TrelloTaskModel.findByIdAndUpdate(
      taskId,
      { columnId: newColumnId },
      { new: true }
    ).lean();
  }
}
