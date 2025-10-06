import { jwtDto, DeleteNoteDto, CreateNoteDto, UpdateNoteDto } from '../dtos/';
import { NoteEntity } from '../entities/note.entity';

export abstract class NoteRepository {
   abstract createdNoteByJWT(dto:jwtDto, createNoteDto: CreateNoteDto):Promise<NoteEntity>;
   abstract updateNoteByJWT(dto:jwtDto,  updateNoteDto: UpdateNoteDto):Promise<NoteEntity>;
   abstract getAllNoteByJWT(dto:jwtDto):Promise<NoteEntity[]>; 
   abstract deleteNoteByJWT(dto:jwtDto, deleteNoteDto:DeleteNoteDto):Promise<void>; 
}