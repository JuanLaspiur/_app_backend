import { NoteDataSource, NoteEntity } from "../../domain";
import { jwtDto, CreateNoteDto, DeleteNoteDto, UpdateNoteDto } from "../../domain/dtos";
import { NoteMapper } from "../mappers/note.mapper";
import { NoteModel } from "../../data/mogodb/models/note.model";

export class NoteDataSourceImpl implements NoteDataSource {
    constructor(
        private readonly verifyToken: (dto: jwtDto) => string,
        private readonly handleError: (error: unknown) => never
    ) {}

    
    async createdNoteByJWT(dto: jwtDto, createNoteDto: CreateNoteDto): Promise<NoteEntity> {
        try {
            const userId = this.verifyToken(dto);

            const [error, validDto] = CreateNoteDto.create(createNoteDto);
            if (error || !validDto) throw new Error(error ?? "Invalid note data"); // TO DO Custom Error

            const doc = await NoteModel.create({ userId, ...validDto });
            return NoteMapper.toEntity(doc);
        } catch (error) {
            this.handleError(error);
        }
    }


    async updateNoteByJWT(dto: jwtDto, updateNoteDto: UpdateNoteDto): Promise<NoteEntity> {
        try {
            const userId = this.verifyToken(dto);

            const doc = await NoteModel.findOneAndUpdate(
                { _id: updateNoteDto.id, userId },
                updateNoteDto,
                { new: true }
            );

            if (!doc) throw new Error(`Note with id ${updateNoteDto.id} not found or does not belong to the user`);

            return NoteMapper.toEntity(doc);
        } catch (error) {
            this.handleError(error);
        }
    }


    async getAllNoteByJWT(dto: jwtDto): Promise<NoteEntity[]> {
        try {
            const userId = this.verifyToken(dto);

            const docs = await NoteModel.find({ userId }).sort({ createdAt: -1 }).lean();
            return NoteMapper.toEntities(docs);
        } catch (error) {
            this.handleError(error);
        }
    }


    async deleteNoteByJWT(dto: jwtDto, deleteNoteDto: DeleteNoteDto): Promise<void> {
        try {
            const userId = this.verifyToken(dto);

            const [error, validDto] = DeleteNoteDto.create(deleteNoteDto);
            if (error || !validDto) throw new Error(error ?? "Invalid delete data");

            const deleted = await NoteModel.findOneAndDelete({
                _id: validDto.id,
                userId,
            });

            if (!deleted) throw new Error(`Note with id ${validDto.id} not found or does not belong to the user`);
        } catch (error) {
            this.handleError(error);
        }
    }
}
