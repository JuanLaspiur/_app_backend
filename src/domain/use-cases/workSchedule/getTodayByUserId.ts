import { WorkScheduleModel } from "../../../data/mogodb";
import { CustomError } from "../../errors/custom.error";
import { getTodayName } from "../../../config/helpers/time.utils";

export class GetToday {
  /**
   * Busca el horario de trabajo del usuario para el día actual.
   * Calcula internamente el día de la semana usando la fecha actual.
   * 
   * @param userId - ID del usuario autenticado.
   * @returns El documento del horario de trabajo para el día actual.
   */
 static async execute(userId: string) {
    const todayName = getTodayName(); 

    const todaySchedule = await WorkScheduleModel.findOne({ userId, day: todayName }).exec();

    if (!todaySchedule) {
      throw CustomError.notFound(`No schedule found for today (${todayName})`);
    }

    return todaySchedule;
  }
}
