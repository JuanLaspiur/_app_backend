import { TrelloTaskModel } from "../../../data/mogodb/";

export class Delete {
  static async execute(taskId: string) {
    return TrelloTaskModel.findByIdAndDelete(taskId).lean();
  }
}
