import { CalendarTaskModel } from "../../../data/mogodb";
import { UpdateCalendarTaskDto } from "../../dtos";
import { CustomError } from "../../errors/custom.error";

export class Update {
  static async execute(userId: string, dto: UpdateCalendarTaskDto) {
    const updateData = {
      ...(dto.title && { title: dto.title }),
      ...(dto.date && { date: dto.date }),
      ...(dto.startTime && { startTime: dto.startTime }),
      ...(dto.endTime && { endTime: dto.endTime }),
    };

    const updated = await CalendarTaskModel.findOneAndUpdate(
      { _id: dto.id, userId },
      { $set: updateData },
      { new: true }
    ).lean();

    if (!updated) throw CustomError.badRequest("Task not found or not authorized");

  }

}