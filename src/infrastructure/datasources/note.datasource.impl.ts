import { CustomError, NoteDataSource, NoteEntity } from "../../domain";
import { jwtDto, CreateNoteDto, DeleteNoteDto, UpdateNoteDto } from "../../domain/dtos";
import { NoteMapper } from "../mappers/note.mapper";
import * as noteUseCases from "../../domain/use-cases/note";

export class NoteDataSourceImpl implements NoteDataSource {
  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) {}

  private authorize(dto: jwtDto) {
    const userId = this.verifyToken(dto);
    if (!userId) throw CustomError.unauthorized("unauthorized: invalid token");
    return userId;
  }

  async createdNoteByJWT(dto: jwtDto, createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    try {
      const userId = this.authorize(dto);
      const note = await noteUseCases.CreateNoteUseCase.execute( userId, createNoteDto );
      return NoteMapper.toEntity(note);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateNoteByJWT(dto: jwtDto, updateNoteDto: UpdateNoteDto): Promise<NoteEntity> {
    try {
      const userId = this.authorize(dto);
      const note = await noteUseCases.UpdateNoteUseCase.execute(userId, updateNoteDto);
      return NoteMapper.toEntity(note);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllNoteByJWT(dto: jwtDto): Promise<NoteEntity[]> {
    try {
      const userId = this.authorize(dto);
      const notes = await noteUseCases.GetAllNotesByUserIdUseCase.execute(userId);
      return NoteMapper.toEntities(notes);
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteNoteByJWT(dto: jwtDto, deleteNoteDto: DeleteNoteDto): Promise<void> {
    try {
      const userId = this.authorize(dto);
      await noteUseCases.DeleteNoteUseCase.execute(userId, deleteNoteDto);
    } catch (error) {
      this.handleError(error);
    }
  }
}
