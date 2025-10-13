import { Request, Response } from "express";
import { CreateNoteDto, UpdateNoteDto, DeleteNoteDto, jwtDto } from "../../domain/dtos";
import { CustomError, NoteRepository } from "../../domain";

export class NoteController {

    constructor(
        private readonly noteRepository: NoteRepository,
        private readonly handleError: (error: unknown, res: Response, num?: number) => void
    ) { }

    async createNote(req: Request, res: Response) {
        try {
            const [errorNote, createNoteDto] = CreateNoteDto.create(req.body);
            if (errorNote || !createNoteDto) return this.handleError(errorNote, res, 1);

            const authHeader = req.headers.authorization;
            if (!authHeader) return this.handleError(new CustomError(401, 'unauthorized'), res, 2);

            const [errorJwt, jwtNotification] = jwtDto.create({ token: authHeader });
            if (errorJwt || !jwtNotification) return this.handleError(errorJwt, res, 3);

            const note = await this.noteRepository.createdNoteByJWT(jwtNotification, createNoteDto);
            return res.status(201).json(note);

        } catch (error) {
            this.handleError(error, res, 4);
        }
    }

    async updateNote(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const [errorNote, updateNoteDto] = UpdateNoteDto.create({ id, ...req.body });
            if (errorNote || !updateNoteDto) return this.handleError(errorNote, res, 1);

            const authHeader = req.headers.authorization;
            if (!authHeader) return this.handleError(new CustomError(401, 'Authorization header missing'), res, 2);

            const [errorJwt, jwtNotification] = jwtDto.create({ token: authHeader });
            if (errorJwt || !jwtNotification) return this.handleError(errorJwt, res, 3);

            const note = await this.noteRepository.updateNoteByJWT(jwtNotification, updateNoteDto);
            return res.status(200).json(note);

        } catch (error) {
            this.handleError(error, res, 4);
        }
    }

    async getAllNoteByJWT(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) return this.handleError(new CustomError(401, 'Authorization header missing'), res, 1);

            const [errorJwt, jwtNotification] = jwtDto.create({ token: authHeader });
            if (errorJwt || !jwtNotification) return this.handleError(errorJwt, res, 2);

            const notes = await this.noteRepository.getAllNoteByJWT(jwtNotification);
            return res.status(200).json(notes);

        } catch (error) {
            this.handleError(error, res, 3);
        }
    }

    async deleteNoteByJWT(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const [errorNote, deleteNoteDto] = DeleteNoteDto.create({ id });
            if (errorNote || !deleteNoteDto) return this.handleError(errorNote, res, 1);

            const authHeader = req.headers.authorization;
            if (!authHeader) return this.handleError(new CustomError(401, 'Authorization header missing'), res, 2);

            const [errorJwt, jwtNotification] = jwtDto.create({ token: authHeader });
            if (errorJwt || !jwtNotification) return this.handleError(errorJwt, res, 3);

            const note = await this.noteRepository.deleteNoteByJWT(jwtNotification, deleteNoteDto);
            return res.status(200).json(note);

        } catch (error) {
            this.handleError(error, res, 4);
        }
    }

}
