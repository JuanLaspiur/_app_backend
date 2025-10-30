import { WorkDayLogModel } from "../../../data/mogodb";
import { CustomError } from "../../errors/custom.error";

export class GetWorkDayLogByIdUseCase {
  async execute(logId: string) {
    const workDayLog = await WorkDayLogModel.findById(logId);
    if (!workDayLog) throw CustomError.badRequest("Work day log not found");

    return workDayLog;
  }
}
