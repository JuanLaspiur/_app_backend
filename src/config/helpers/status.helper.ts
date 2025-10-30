import { WorkDayStatus } from "../../data/mogodb";
import { getTodayDateAtTime, getMinutesDiff } from "./time.utils";

/**
 * Determina si el empleado asistió a tiempo o llegó tarde.
 */
export const determineAttendanceStatus = (startTime: string): WorkDayStatus => {
  const scheduledStart = getTodayDateAtTime(startTime);
  const now = new Date();
  const diffMinutes = getMinutesDiff(now, scheduledStart);

  return diffMinutes <= 15 ? WorkDayStatus.ATTENDED : WorkDayStatus.LATE;
};
