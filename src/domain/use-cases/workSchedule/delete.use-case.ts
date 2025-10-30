import { WorkScheduleModel } from "../../../data/mogodb";
import { CustomError } from "../../errors/custom.error";

export class Delete {
  static async execute(id: string) {
    const deleted = await WorkScheduleModel.findByIdAndDelete(id);
    if (!deleted) throw CustomError.notFound("Work schedule not found");
    return true;
  }
}
