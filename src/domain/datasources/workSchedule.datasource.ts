import { WorkScheduleEntity } from "../entities/workSchedule.entity";

export abstract class WorkScheduleDataSource {
    abstract createWorkShedule():Promise<WorkScheduleEntity>;
    abstract updateWorkShedule():Promise<WorkScheduleEntity>;
    abstract getAllUserWorkShedules():Promise<WorkScheduleEntity[]>;

}