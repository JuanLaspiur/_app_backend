import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { VacationRoutes } from "./vacation/routes"
import { NotificationRoutes } from "./notification/routes";
import { UserRoutes } from "./user/routes";
import { NoteRoutes } from "./note/routes";
import { CalendarTaskRoutes } from "./calendarTask/routes";
import { PushNotificationRoutes } from './pushnotification/routes';
import { WorkScheduleRoutes } from "./workSchedule/routes";
import { WorkDayLogRoutes } from "./workLog/routes";
import { DepartmentRoutes } from "./departament/routes";
import { TeamRoutes } from "./team/routes";
import { TeamMemberRoutes } from "./teamMember/routes";
import { PaymentRoutes } from "./payment/routes";
import { ProyectRoutes } from "./proyect/routes";
import { TrelloTaskRoutes } from "./trelloTask/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/users', UserRoutes.routes);
        router.use('/api/vacations', VacationRoutes.routes);
        router.use('/api/notifications', NotificationRoutes.routes);
        router.use('/api/notes', NoteRoutes.routes);
        router.use('/api/calendarTasks', CalendarTaskRoutes.routes);
        router.use('/api/pushNotifications', PushNotificationRoutes.routes);
        router.use('/api/workSchedules', WorkScheduleRoutes.routes);
        router.use('/api/workDayLogs', WorkDayLogRoutes.routes);
        router.use('/api/departments', DepartmentRoutes.routes);
        router.use('/api/teams', TeamRoutes.routes);
        router.use('/api/teamMembers', TeamMemberRoutes.routes);
        router.use('/api/payments', PaymentRoutes.routes);
        router.use('/api/proyects', ProyectRoutes.routes);
        router.use('/api/trelloTasks', TrelloTaskRoutes.routes);

        return router;
    }
}