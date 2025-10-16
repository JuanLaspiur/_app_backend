import { WorkLogDataSource, WorkLogEntity, WorkLogRepository } from "../../domain";
import { jwtDto } from "../../domain/dtos";

export class WorkLogRepositoryImpl implements WorkLogRepository{

  constructor(
    private readonly datasource: WorkLogDataSource
  ) {}
    openLog(dto: jwtDto, logId: string): Promise<WorkLogEntity> {
        return this.datasource.openLog(dto, logId);
    }
    closeLog(dto: jwtDto, logId: string): Promise<WorkLogEntity> {
        return this.datasource.closeLog(dto, logId);
    }





}