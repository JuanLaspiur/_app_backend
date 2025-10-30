import { WorkScheduleModel } from "../../../data/mogodb";

export class GetAllWorkSchedulesUseCase {
  async execute(userId: string) {
    const docs = await WorkScheduleModel.find({ userId });
    return docs;
  }
}