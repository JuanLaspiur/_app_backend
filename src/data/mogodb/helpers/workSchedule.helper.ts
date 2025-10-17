import { WorkDayLogModel, WorkDayStatus } from "../models/workDayLog.model";
import { DaysOfWeekArray, WorkScheduleModel } from "../models/workSchedule.model";


export async function createMissingSchedulesAndLogs(userId: string, currentScheduleId: string, isWorkday:boolean) {
  const existingDays = await WorkScheduleModel.find({ userId }).select('day');
  const existingDaysSet = new Set(existingDays.map(d => d.day));

  const missingDays = DaysOfWeekArray.filter(day => !existingDaysSet.has(day));

  // quiero que siempre se ponga 00 en iso
  const schedulesToCreate = missingDays.map(day => ({
    userId,
    day,
    startTime: "00:00",
    endTime: "00:00",
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
