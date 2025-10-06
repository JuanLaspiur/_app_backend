import { NoteDataSource, NoteEntity, NoteRepository } from "../../domain";
import { jwtDto, CreateNoteDto, UpdateNoteDto, DeleteNoteDto } from "../../domain/dtos";

export class NoteRepositoryImpl implements NoteRepository {
    constructor( private readonly noteDataSource: NoteDataSource){}

    createdNoteByJWT(dto: jwtDto, createNoteDto: CreateNoteDto): Promise<NoteEntity> {
       return this.noteDataSource.createdNoteByJWT(dto, createNoteDto);
    }
    updateNoteByJWT(dto: jwtDto, updateNoteDto: UpdateNoteDto): Promise<NoteEntity> {
      return this.noteDataSource.updateNoteByJWT(dto, updateNoteDto);  
    }
    getAllNoteByJWT(dto: jwtDto): Promise<NoteEntity[]> {
      return this.noteDataSource.getAllNoteByJWT(dto);
    }
    deleteNoteByJWT(dto: jwtDto, deleteNoteDto: DeleteNoteDto): Promise<void> {
      return this.noteDataSource.deleteNoteByJWT(dto, deleteNoteDto);
    }


    
}