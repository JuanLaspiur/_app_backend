import { WorkScheduleModel } from "../../../data/mogodb";

export class DeleteAllFromUser {
  static async execute(userId: string): Promise<void> {
    if (!userId) throw new Error("User ID is required");

    await WorkScheduleModel.deleteMany({ userId });
  }
}
