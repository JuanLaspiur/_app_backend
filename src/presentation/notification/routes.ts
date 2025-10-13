import { Router } from "express";
import { NotificationController } from "./controller";
import { NotificationDataSourceImpl, NotificationRepositoryImpl } from "../../infrastructure";
import { verifyToken } from "../../config/helpers";

export class NotificationRoutes {
        static get routes(): Router {
            const datasource = new NotificationDataSourceImpl(verifyToken);
            const notificationRepository = new NotificationRepositoryImpl(datasource);
            const controller = new NotificationController(notificationRepository);
            
            const router = Router();
            router.post('/create', controller.createNotification.bind(controller));
            router.put('/update/:id', controller.updateNotification.bind(controller));
            router.get('/getAll', controller.getAllNotifications.bind(controller));
           // router.get('/getAllByUserId/:userId', controller.getAllUserNotifications.bind(controller));
            return router;
        }
}

