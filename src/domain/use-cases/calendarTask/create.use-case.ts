import { CalendarTaskModel } from "../../../data/mogodb";
import { CreateCalendarTaskDto } from "../../dtos";

export class Create {
  static async execute(userId:string, createDto: CreateCalendarTaskDto) {
    return  await CalendarTaskModel.create({
                    userId,
                    title: createDto.title,
                    date: createDto.date,
                    startTime: createDto.startTime,
                    endTime: createDto.endTime,
                });
  }
}
