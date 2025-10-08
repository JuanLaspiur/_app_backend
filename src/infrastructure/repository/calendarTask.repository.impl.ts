import {CalendarTaskDataSource, CalendarTaskRepository, CalendarTaskEntity } from '../../domain';
import { CreateCalendarTaskDto, UpdateCalendarTaskDto, DeleteCalendarTaskDto, jwtDto} from '../../domain/dtos';

export class CalendarTaskRepositoryImpl implements CalendarTaskRepository{
      constructor(private readonly calendarTaskDataSource: CalendarTaskDataSource){}

    createCalendarTask(dto: jwtDto, createDto: CreateCalendarTaskDto): Promise<CalendarTaskEntity> {
       return this.calendarTaskDataSource.createCalendarTask(dto, createDto);
    }
    updateCalendarTask(dto: jwtDto, updateDto: UpdateCalendarTaskDto): Promise<CalendarTaskEntity> {
        return this.calendarTaskDataSource.updateCalendarTask(dto,updateDto);
    }
    deleteCalendarTask(dto: jwtDto, deleteDto: DeleteCalendarTaskDto): Promise<null> {
        return this.calendarTaskDataSource.deleteCalendarTask(dto, deleteDto);
    }
    getAllCalendarTaskByJWT(dto: jwtDto): Promise<CalendarTaskEntity[]> {
        return this.calendarTaskDataSource.getAllCalendarTaskByJWT(dto);
    }


    
}