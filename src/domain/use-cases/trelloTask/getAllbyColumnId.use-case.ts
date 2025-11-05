import { TrelloTaskModel } from "../../../data/mogodb/";
import { CreateTrelloTaskDto } from "../../dtos";

export class GetAllByColumnId {
 static async execute(columnId: string) {
    return  await TrelloTaskModel.find({ columnId }).sort({ createdAt: -1 })
     .populate("assignees") 
      .lean();
  }
}