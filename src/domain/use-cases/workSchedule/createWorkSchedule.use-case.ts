import { WorkScheduleModel } from "../../../data/mogodb";

export class CreateWorkScheduleUseCase {
  async execute(userId: string, data: any) {
    const doc = await WorkScheduleModel.findOneAndUpdate(
      { userId, day: data.day },
      { userId, ...data },
      { new: true, upsert: true }
    );
    return doc; 
  }
}
