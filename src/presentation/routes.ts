import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { VacationRoutes } from "./vacation/routes"
import { NotificationRoutes } from "./notification/routes";
import { UserRoutes } from "./user/routes";
import { NoteRoutes } from "./note/routes";

export class AppRoutes {
   static get routes():Router{
    const router = Router();   
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/users', UserRoutes.routes);
    router.use('/api/vacations', VacationRoutes.routes);
    router.use('/api/notifications', NotificationRoutes.routes);
    router.use('/api/notes', NoteRoutes.routes);
    
    return router;
}

}