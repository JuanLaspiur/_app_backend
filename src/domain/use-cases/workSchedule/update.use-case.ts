import { WorkScheduleModel } from "../../../data/mogodb";
import { CustomError } from "../../errors/custom.error";

export class UpdateWorkScheduleUseCase {
  static async execute(id: string, data: any) {
    const updated = await WorkScheduleModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );
    if (!updated) throw CustomError.notFound("Work schedule not found");
    return updated;
  }
}
