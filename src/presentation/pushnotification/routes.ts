import { Router } from "express";
import { PushNotificationController } from "./controller";
import { PushNotificationDataSourceImpl, PushNotificationRepositoryImpl } from "../../infrastructure";
import { verifyToken, handleError, handleErrorController } from "../../config/helpers";

export class PushNotificationRoutes {
        static get routes(): Router {
            const datasource = new PushNotificationDataSourceImpl(verifyToken, handleError);
            const pushNotificationRepository = new PushNotificationRepositoryImpl(datasource);
            const controller = new PushNotificationController(pushNotificationRepository, handleErrorController);
            
            const router = Router();
            router.post('/save', controller.saveToken.bind(controller));
            router.get('/get', controller.getTokensByUser.bind(controller));
           // router.get('/getAllByUserId/:userId', controller.getAllUserNotifications.bind(controller));
            return router;
        }
}

