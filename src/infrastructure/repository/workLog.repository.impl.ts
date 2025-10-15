import { WorkLogDataSource, WorkLogEntity, WorkLogRepository } from "../../domain";
import { jwtDto } from "../../domain/dtos";

export class WorkLogRepositoryImpl implements WorkLogRepository{

  constructor(
    private readonly datasource: WorkLogDataSource
  ) {}
    createLog(dto: jwtDto, scheduleId: string): Promise<WorkLogEntity> {
        return this.datasource.createLog(dto, scheduleId);
    }
    closeLog(dto: jwtDto, logId: string): Promise<WorkLogEntity> {
        return this.datasource.closeLog(dto, logId);
    }
    getAllUserLogs(dto: jwtDto): Promise<WorkLogEntity[]> {
        return this.datasource.getAllUserLogs(dto);
    }
    getLogsByDateRange(dto: jwtDto, startDate: Date, endDate: Date): Promise<WorkLogEntity[]> {
        return this.datasource.getLogsByDateRange(dto,startDate, endDate);
    }
    deleteLog(logId: string): Promise<void> {
        return this.datasource.deleteLog(logId);
    }





}