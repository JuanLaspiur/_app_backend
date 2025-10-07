import { jwtDto, CreateCalendarTaskDto, DeleteCalendarTaskDto, UpdateCalendarTaskDto } from "../dtos";
import { CalendarTaskEntity } from "../entities/calendarTask.entity";

export abstract class CalendarTaskRepository {

    abstract createCalendarTask(dto:jwtDto, createDto:CreateCalendarTaskDto):Promise<CalendarTaskEntity>;
    abstract updateCalendarTask(dto:jwtDto, updateDto:UpdateCalendarTaskDto):Promise<CalendarTaskEntity>;
    abstract deleteCalendarTask(dto:jwtDto, deleteDto: DeleteCalendarTaskDto):Promise<null>;
    abstract getAllCalendarTaskByJWT(dto:jwtDto):Promise<CalendarTaskEntity[]>;
    
}