import { WorkScheduleModel } from "../../../data/mogodb";

export class GetAllByUserId {
 static async execute(userId: string) {
    const docs = await WorkScheduleModel.find({ userId });
    return docs;
  }
}