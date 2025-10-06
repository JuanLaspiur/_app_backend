import { NoteEntity } from '../entities/note.entity';
import { jwtDto, CreateNoteDto, UpdateNoteDto, DeleteNoteDto } from '../dtos';

export abstract class NoteDataSource {
   abstract createdNoteByJWT(dto: jwtDto, createNoteDto: CreateNoteDto): Promise<NoteEntity>;
   abstract updateNoteByJWT(dto: jwtDto, updateNoteDto: UpdateNoteDto): Promise<NoteEntity>;
   abstract getAllNoteByJWT(dto: jwtDto): Promise<NoteEntity[]>;
   abstract deleteNoteByJWT(dto: jwtDto, deleteNoteDto:DeleteNoteDto): Promise<void>
   
   
   
   ;
}