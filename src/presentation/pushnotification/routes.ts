import { Router } from "express";
import { PushNotificationController } from "./controller";
import { PushNotificationDataSourceImpl, PushNotificationRepositoryImpl } from "../../infrastructure";


export class PushNotificationRoutes {
        static get routes(): Router {
            const datasource = new PushNotificationDataSourceImpl();
            const pushNotificationRepository = new PushNotificationRepositoryImpl(datasource);
            const controller = new PushNotificationController(pushNotificationRepository);
            
            const router = Router();
            router.post('/save', controller.saveToken.bind(controller));
            router.get('/get', controller.getTokensByUser.bind(controller));
           // router.get('/getAllByUserId/:userId', controller.getAllUserNotifications.bind(controller));
            return router;
        }
}

