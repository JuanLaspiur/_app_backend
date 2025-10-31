import { CalendarTaskModel } from "../../../data/mogodb";
import { DeleteCalendarTaskDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";

export class Delete {
  static async execute(dto: DeleteCalendarTaskDto): Promise<boolean> {
    const res = await CalendarTaskModel.findByIdAndDelete(dto.id);
    if(!res) throw CustomError.badRequest("Task not found or not authorized");
    return !!res;
  }
}