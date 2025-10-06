import { Request, Response } from "express";
import { CreateNoteDto, UpdateNoteDto, DeleteNoteDto, jwtDto } from "../../domain/dtos";
import { CustomError, NoteRepository } from "../../domain";

export class NoteController {

    constructor(private readonly noteRepository: NoteRepository) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    async createNote(req: Request, res: Response) {
        try {
            const [errorNote, createNoteDto] = CreateNoteDto.create(req.body);
            if (errorNote || !createNoteDto) return res.status(400).json({ error: errorNote });

            const authHeader = req.headers.authorization;
            if (!authHeader) return res.status(401).json({ error: "Authorization header missing" });

            const [errorJwt, jwtNotification] = jwtDto.create({ token: authHeader });
            if (errorJwt || !jwtNotification) return res.status(401).json({ error: errorJwt });

            const note = await this.noteRepository.createdNoteByJWT(jwtNotification, createNoteDto);
            return res.status(201).json(note);

        } catch (error) {
            this.handleError(error, res);
        }
    }

    async updateNote(req: Request, res: Response) {
        try {
             const { id } = req.params;
             const body = req.body;
            const [errorNote, updateNoteDto] = UpdateNoteDto.create({id, ...body });
            if (errorNote || !updateNoteDto) return res.status(400).json({ error: errorNote });

            const authHeader = req.headers.authorization;
            if (!authHeader) return res.status(401).json({ error: "Authorization header missing" });

            const [errorJwt, jwtNotification] = jwtDto.create({ token: authHeader });
            if (errorJwt || !jwtNotification) return res.status(401).json({ error: errorJwt });

            const note = await this.noteRepository.updateNoteByJWT(jwtNotification, updateNoteDto);
            return res.status(201).json(note);

        } catch (error) {
            this.handleError(error, res);
        }
    }


    async getAllNoteByJWT(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) return res.status(401).json({ error: "Authorization header missing" });

            const [errorJwt, jwtNotification] = jwtDto.create({ token: authHeader });
            if (errorJwt || !jwtNotification) return res.status(401).json({ error: errorJwt });

            const note = await this.noteRepository.getAllNoteByJWT(jwtNotification);
            return res.status(201).json(note);

        } catch (error) {
            this.handleError(error, res);
        }
    }

    async deleteNoteByJWT(req: Request, res: Response) {
        try {
                const { id } = req.params;
               const [errorNote, deleteNoteDto] = DeleteNoteDto.create({id});
            if (errorNote || !deleteNoteDto) return res.status(400).json({ error: errorNote });

            const authHeader = req.headers.authorization;
            if (!authHeader) return res.status(401).json({ error: "Authorization header missing" });

            const [errorJwt, jwtNotification] = jwtDto.create({ token: authHeader });
            if (errorJwt || !jwtNotification) return res.status(401).json({ error: errorJwt });

            const note = await this.noteRepository.deleteNoteByJWT(jwtNotification, deleteNoteDto);
            return res.status(201).json(note);

        } catch (error) {
            this.handleError(error, res);
        }
    }

}