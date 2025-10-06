import { Router } from "express";
import { NoteController } from './controller';
import { NoteDataSourceImpl, NoteRepositoryImpl } from "../../infrastructure";

export class NoteRoutes{

    static get routes (): Router{
        const datasource = new NoteDataSourceImpl();
        const noteRepository = new NoteRepositoryImpl(datasource);
        const controller = new NoteController(noteRepository);

        const router = Router();
        router.post('/create', controller.createNote.bind(controller));
        router.put('/update/:id', controller.updateNote.bind(controller));
        router.get('/getAll', controller.getAllNoteByJWT.bind(controller));
        router.delete('/delete/:id', controller.deleteNoteByJWT.bind(controller));

        return router;
    }

}