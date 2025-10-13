
import { CalendarTaskDataSource, CalendarTaskEntity } from "../../domain";
import {
    CreateCalendarTaskDto,
    UpdateCalendarTaskDto,
    DeleteCalendarTaskDto,
    jwtDto,
} from "../../domain/dtos";
import { CalendarTaskMapper } from "../mappers/calendarTask.mapper";
import { CalendarTaskModel } from "../../data/mogodb/models/calendarTask.model";

export class CalendarTaskDataSourceImpl implements CalendarTaskDataSource {
    constructor(
        private readonly verifyToken: (dto: jwtDto) => string,
        private readonly handleError: (error: unknown) => never
    ) { }



    async createCalendarTask(dto: jwtDto, createDto: CreateCalendarTaskDto): Promise<CalendarTaskEntity> {
        const userId = this.verifyToken(dto);
        try {
            const created = await CalendarTaskModel.create({
                userId,
                title: createDto.title,
                date: createDto.date,
                startTime: createDto.startTime,
                endTime: createDto.endTime,
            });
            return CalendarTaskMapper.toEntity(created);
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateCalendarTask(dto: jwtDto, updateDto: UpdateCalendarTaskDto): Promise<CalendarTaskEntity> {
        if (!updateDto.id) throw new Error("Task ID is required for update");
        const userId = this.verifyToken(dto);
        const updateData = {
            ...(updateDto.title && { title: updateDto.title }),
            ...(updateDto.date && { date: updateDto.date }),
            ...(updateDto.startTime && { startTime: updateDto.startTime }),
            ...(updateDto.endTime && { endTime: updateDto.endTime }),
        };
        try {
            const updated = await CalendarTaskModel.findOneAndUpdate(
                { _id: updateDto.id, userId },
                { $set: updateData },
                { new: true }
            ).lean();

            if (!updated) throw new Error("Task not found or not authorized");
            return CalendarTaskMapper.toEntity(updated);
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteCalendarTask(dto: jwtDto, deleteDto: DeleteCalendarTaskDto): Promise<null> {
        if (!deleteDto.id) throw new Error("Task ID is required for deletion");
        const userId = this.verifyToken(dto);
        try {
            const deleted = await CalendarTaskModel.findOneAndDelete({
                _id: deleteDto.id,
                userId,
            });

            if (!deleted) throw new Error("Task not found or not authorized");
            return null;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getAllCalendarTaskByJWT(dto: jwtDto): Promise<CalendarTaskEntity[]> {
        const userId = this.verifyToken(dto);
        try {
            const tasks = await CalendarTaskModel.find({ userId })
                .sort({ date: 1 })
                .lean();

            return CalendarTaskMapper.toEntities(tasks);
        } catch (error) {
            this.handleError(error);
        }
    }
}
