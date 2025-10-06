import { Router } from "express";
import { UserController } from "./controller";
import { UserDataSourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { upload } from "../../infrastructure/upload/multer.config";

export class UserRoutes {
    static get routes(): Router {

        const datasource = new UserDataSourceImpl();
        const authRepositoy = new UserRepositoryImpl(datasource);
        const controller = new UserController(authRepositoy);

        const router = Router();
        router.get('/getAll', controller.getAllUsers.bind(controller));
        router.get('/getAllActive', controller.getAllActiveUsers.bind(controller));
        router.get('/userId/:id', controller.getUserById.bind(controller));
        router.put('/userId/:id', controller.updateUserById.bind(controller));


        
        router.post('/images', upload.single('image'), controller.uploadImage.bind(controller));
        router.post('/:id/images', upload.single('image'), controller.uploadImageToUser.bind(controller));

        return router;
    }
}
