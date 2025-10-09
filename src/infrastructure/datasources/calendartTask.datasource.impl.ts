import jwt from "jsonwebtoken";
import { CalendarTaskDataSource, CalendarTaskEntity } from "../../domain";
import { CreateCalendarTaskDto, UpdateCalendarTaskDto, DeleteCalendarTaskDto, jwtDto } from '../../domain/dtos';
import { CalendarTaskMapper } from "../mappers/calendarTask.mapper";
import { CalendarTaskModel } from "../../data/mogodb/models/calendarTask.model";

export class CalendarTaskDataSourceImpl implements CalendarTaskDataSource {
    constructor() {}

    async createCalendarTask(dto: jwtDto, createDto: CreateCalendarTaskDto): Promise<CalendarTaskEntity> {
        if (!dto?.token) throw new Error("JWT token is required");
        let payload: any;
        try {
            payload = jwt.verify(dto.token, process.env.JWT_SECRET!)
        } catch (error) {
            throw new Error("Invalid or expired token");
        }
        try {
            const createdDoc = await CalendarTaskModel.create({
                userId: payload.id,
                title: createDto.title,
                date: createDto.date,
                startTime: createDto.startTime,
                endTime: createDto.endTime,
            });
            return CalendarTaskMapper.toEntity(createdDoc);
        } catch (error) {
            throw new Error("Invalid or expired token ");
        }
    }

    async updateCalendarTask(dto: jwtDto, updateDto: UpdateCalendarTaskDto): Promise<CalendarTaskEntity> {
        if (!updateDto.id) throw new Error("Task ID is required for update");
        if (!dto?.token) throw new Error("JWT token is required");
        let payload: any;
        try {
            payload = jwt.verify(dto.token, process.env.JWT_SECRET!)
        } catch (error) {
            throw new Error("Invalid or expired token");
        }
        const updateData: any = {};
        if (updateDto.title) updateData.title = updateDto.title;
        if (updateDto.date) updateData.date = updateDto.date;
        if (updateDto.startTime) updateData.startTime = updateDto.startTime;
        if (updateDto.endTime) updateData.endTime = updateDto.endTime;

        const updatedDoc = await CalendarTaskModel.findByIdAndUpdate(
            updateDto.id,
            { $set: updateData },
            { new: true }
        );

        if (!updatedDoc) throw new Error("Task not found");

        return CalendarTaskMapper.toEntity(updatedDoc.toObject());
    }

    async deleteCalendarTask(dto: jwtDto, deleteDto: DeleteCalendarTaskDto): Promise<null> {
        if (!dto?.token) throw new Error("JWT token is required");
        if (!deleteDto.id) throw new Error("Task ID is required for deletion");

        let payload: any;
        try {
            payload = jwt.verify(dto.token, process.env.JWT_SECRET!);
        } catch (error) {
            throw new Error("Invalid or expired token");
        }

        const deleted = await CalendarTaskModel.findOneAndDelete({
            _id: deleteDto.id,
            userId: payload,
        });

        if (!deleted) throw new Error("Task not found or not authorized");

        return null;
    }

    async getAllCalendarTaskByJWT(dto: jwtDto): Promise<CalendarTaskEntity[]> {
        if (!dto?.token) throw new Error("JWT token is required");

        let payload: any;
        try {
            payload = jwt.verify(dto.token, process.env.JWT_SECRET!);
        } catch (error) {
            throw new Error("Invalid or expired token");
        }

        const tasks = await CalendarTaskModel.find({ userId: payload.id }).sort({ date: 1 });

        return CalendarTaskMapper.toEntities(tasks.map(task => task.toObject()));
    }


}
