import { WorkDayLogModel } from "../../../data/mogodb"; 

export class GetAllByUserId {
   static async execute(userId: string) {
    const workdayLogs = await WorkDayLogModel.find({ userId })
      .populate({
        path: "scheduleId",
        model: "Work_Schedule",
        select: "id userId day startTime endTime isWorkday",
      })
      .exec();

    return workdayLogs;
  }
}
