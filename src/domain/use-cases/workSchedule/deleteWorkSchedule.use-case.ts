import { WorkScheduleModel } from "../../../data/mogodb";

export class DeleteWorkScheduleUseCase {
  async execute(id: string) {
    const deleted = await WorkScheduleModel.findByIdAndDelete(id);
    if (!deleted) throw new Error("Work schedule not found");
    return true;
  }
}
