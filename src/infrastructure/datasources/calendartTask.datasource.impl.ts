
import { CalendarTaskDataSource, CalendarTaskEntity, CustomError } from "../../domain";
import { CreateCalendarTaskDto, UpdateCalendarTaskDto, DeleteCalendarTaskDto, jwtDto, } from "../../domain/dtos";
import { CalendarTaskMapper } from "../mappers/calendarTask.mapper";
import * as calendarTaskCaseUse from '../../domain/use-cases/calendarTask'

export class CalendarTaskDataSourceImpl implements CalendarTaskDataSource {
    constructor(
        private readonly verifyToken: (dto: jwtDto) => string,
        private readonly handleError: (error: unknown) => never
    ) { }

    private authorize(dto: jwtDto) {
        const userId = this.verifyToken(dto);
        if (!userId) throw CustomError.unauthorized("unauthorized: invalid authtoken");
        return userId;
    }

    async createCalendarTask(dto: jwtDto, createDto: CreateCalendarTaskDto): Promise<CalendarTaskEntity> {
        try {
            const userId = this.authorize(dto);
            const calendarTask = await calendarTaskCaseUse.Create.execute(userId, createDto)
            return CalendarTaskMapper.toEntity(calendarTask);
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateCalendarTask(dto: jwtDto, updateDto: UpdateCalendarTaskDto): Promise<CalendarTaskEntity> {
        try {
            const userId = this.authorize(dto);
            const calendarTask = await calendarTaskCaseUse.Update.execute(userId, updateDto)
            return CalendarTaskMapper.toEntity(calendarTask);
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteCalendarTask(dto: jwtDto, deleteDto: DeleteCalendarTaskDto): Promise<null> {
        try {
            this.authorize(dto);
            await calendarTaskCaseUse.Delete.execute(deleteDto);
            return null;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getAllCalendarTaskByJWT(dto: jwtDto): Promise<CalendarTaskEntity[]> {
        try {
            const userId = this.authorize(dto);
            const tasks = await calendarTaskCaseUse.GetAllByUserId.execute(userId);
            return CalendarTaskMapper.toEntities(tasks);
        } catch (error) {
            this.handleError(error);
        }
    }
}
