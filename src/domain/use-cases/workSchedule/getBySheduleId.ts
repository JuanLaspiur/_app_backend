import { WorkDayLogModel } from "../../../data/mogodb";
import { CustomError } from "../../errors/custom.error";

export class GetTodayWorkDayLogByScheduleUseCase {
  /**
   * Busca el registro de jornada de hoy según el scheduleId.
   * Popula la información del horario (WorkSchedule) en el resultado.
   *
   * @param scheduleId - ID del horario de hoy
   * @returns El documento de WorkDayLog con el schedule populado
   */
  static async execute(scheduleId: string) {
    const todayLog = await WorkDayLogModel.findOne({ scheduleId })
      .populate({
        path: "scheduleId",
        model: "Work_Schedule",
        select: "id userId day startTime endTime isWorkday",
      })
      .exec();

    if (!todayLog) {
      throw CustomError.notFound(`No work log found for today's schedule`);
    }

    return todayLog;
  }
}
