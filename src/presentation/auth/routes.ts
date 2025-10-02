import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";

export class AuthRoutes {
    static get routes(): Router {

        const datasource = new AuthDataSourceImpl();
        const authRepositoy = new AuthRepositoryImpl(datasource);

        const controller = new AuthController(authRepositoy);

        const router = Router();
        router.post('/register', controller.register.bind(controller));
        router.post('/login', controller.login.bind(controller));
        router.put('/updatePassword/:id', controller.updatePassword.bind(controller));


        return router;
    }
}