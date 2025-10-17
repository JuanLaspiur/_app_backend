import { WorkDayLogModel, WorkDayStatus } from "../models/workDayLog.model";
import { DaysOfWeekArray, WorkScheduleModel } from "../models/workSchedule.model";


export async function createMissingSchedulesAndLogs(userId: string, currentScheduleId: string, isWorkday:boolean) {
  const existingDays = await WorkScheduleModel.find({ userId }).select('day');
  const existingDaysSet = new Set(existingDays.map(d => d.day));

  const missingDays = DaysOfWeekArray.filter(day => !existingDaysSet.has(day));

// pasar a formato ISO que sea  00:00 para en cualquier lugar del mundo
  const schedulesToCreate = missingDays.map(day => ({
    userId,
    day,
    startTime: "1970-01-01T00:00:00.000Z",
    endTime: "1970-01-01T00:00:00.000Z",
    isWorkday: false,
  }));

  if (schedulesToCreate.length > 0) {
    const createdSchedules = await WorkScheduleModel.insertMany(schedulesToCreate);

    const logs = createdSchedules.map(s => ({
      userId: s.userId,
      scheduleId: s._id.toString(),
      status: isWorkday ? WorkDayStatus.PENDING : WorkDayStatus.OFF,
    }));

    await WorkDayLogModel.insertMany(logs);
  }


  if (currentScheduleId) {
    await WorkDayLogModel.create({
      userId,
      scheduleId: currentScheduleId,
      status: isWorkday ? WorkDayStatus.PENDING : WorkDayStatus.OFF,
    });
  }
}
