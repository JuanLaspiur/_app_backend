import jwt from "jsonwebtoken";
import { NoteDataSource, NoteEntity } from "../../domain";
import { jwtDto, CreateNoteDto, DeleteNoteDto, UpdateNoteDto } from "../../domain/dtos";
import { NoteMapper } from "../mappers/note.mapper";
import { NoteModel } from "../../data/mogodb/models/note.model";

export class NoteDataSourceImpl implements NoteDataSource {
    constructor() { }


    async createdNoteByJWT(dto: jwtDto, createNoteDto: CreateNoteDto): Promise<NoteEntity> {
        let payload: any;
        try {
            
            if (!dto.token) throw new Error("Token is missing");
            payload = jwt.verify(dto.token, process.env.JWT_SECRET!);
        } catch {
            throw new Error("Invalid or expired token");
        }
        const userId = payload.id || payload.userId;
        if (!userId) throw new Error("Invalid token payload: missing user id");

        const [error, validDto] = CreateNoteDto.create(createNoteDto);
        if (error || !validDto) throw new Error(error ?? "Invalid note data");

        const doc = await NoteModel.create({userId,...validDto});
        return NoteMapper.toEntity(doc);
    }

    async updateNoteByJWT(dto: jwtDto, updateNoteDto: UpdateNoteDto): Promise<NoteEntity> {
        const doc = await NoteModel.findByIdAndUpdate(updateNoteDto.id, updateNoteDto,{ new: true });
        let payload: any;
        try {
            if (!dto.token) throw new Error("Token is missing");
            payload = jwt.verify(dto.token, process.env.JWT_SECRET!);
        } catch (error) {
            throw new Error("Invalid or expired token");
        }

        const userId = payload.id || payload.userId;
        if (!userId) {
            throw new Error("Invalid token payload: missing user id");
        }

        if (!doc) {
            throw new Error(`Notification with id ${updateNoteDto.id} not found`);
        }
        return NoteMapper.toEntity(doc);
    }

    async getAllNoteByJWT(dto: jwtDto): Promise<NoteEntity[]> {
        let payload: any;

        try {
            if (!dto.token) throw new Error("Token is missing");
            payload = jwt.verify(dto.token, process.env.JWT_SECRET!);
        } catch (error) {
            throw new Error("Invalid or expired token");
        }

        const userId = payload.id || payload.userId;
        if (!userId) {
            throw new Error("Invalid token payload: missing user id");
        }

        const docs = await NoteModel.find({ userId }).sort({ createdAt: -1 });

        return NoteMapper.toEntities(docs);
    }

    async deleteNoteByJWT(dto: jwtDto, deleteNoteDto: DeleteNoteDto): Promise<void> {
        let payload: any;
        try {
            if (!dto.token) throw new Error("Token is missing");
            payload = jwt.verify(dto.token, process.env.JWT_SECRET!);
        } catch {
            throw new Error("Invalid or expired token");
        }

        const userId = payload.id || payload.userId;
        if (!userId) {
            throw new Error("Invalid token payload: missing user id");
        }

        const [error, validDto] = DeleteNoteDto.create(deleteNoteDto);
        if (error || !validDto) throw new Error(error ?? "Invalid delete data");

        const deleted = await NoteModel.findOneAndDelete({
            _id: validDto.id,
            userId: userId
        });

        if (!deleted) {
            throw new Error(`Note with id ${validDto.id} not found or does not belong to the user`);
        }
    }

}
