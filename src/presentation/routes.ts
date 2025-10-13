import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { VacationRoutes } from "./vacation/routes"
import { NotificationRoutes } from "./notification/routes";
import { UserRoutes } from "./user/routes";
import { NoteRoutes } from "./note/routes";
import { CalendarTaskRoutes } from "./calendarTask/routes";
import { PushNotificationRoutes } from './pushnotification/routes';

export class AppRoutes {
   static get routes():Router{
    const router = Router();   
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/users', UserRoutes.routes);
    router.use('/api/vacations', VacationRoutes.routes);
    router.use('/api/notifications', NotificationRoutes.routes);
    router.use('/api/notes', NoteRoutes.routes);
    router.use('/api/calendarTasks', CalendarTaskRoutes.routes);
    router.use('/api/pushNotifications', PushNotificationRoutes.routes);

    return router;
}

}