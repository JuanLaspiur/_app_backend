import { WorkScheduleModel } from "../../../data/mogodb";
import { CustomError } from "../../errors/custom.error";

export class GetWorkScheduleByIdUseCase {
  static async execute(scheduleId: string) {
    const workSchedule = await WorkScheduleModel.findById(scheduleId);
    if (!workSchedule) throw CustomError.badRequest("Work schedule not found");

    return workSchedule;
  }
}
