import { Request, Response } from "express";
import { CreateNotificationDto } from "../../domain/dtos";
import { NotificationRepository, CustomError } from "../../domain";
import { UpdateNotificationDto } from "../../domain/dtos/notification/updateNotification.dto";
import { jwtDto } from "../../domain/dtos/jwt.dto";

export class NotificationController {
    constructor(private readonly notificationRepository: NotificationRepository) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    createNotification(req: Request, res: Response) {
        const [error, createNotificationDto] = CreateNotificationDto.create(req.body);

        if (error) return res.status(400).json({ error });

        this.notificationRepository.createNotification(createNotificationDto!).
            then(notification => res.status(200).json(notification))
            .catch(error => this.handleError(error, res));

    }

    updateNotification(req: Request, res: Response) {
        const { id } = req.params;
        const updateNotificationDto = UpdateNotificationDto.create(req.body);

        this.notificationRepository
            .updateNotification(id, updateNotificationDto!)
            .then((notification) => res.status(200).json(notification))
            .catch((error) => this.handleError(error, res));

    }

    updateNotificationsStatusJWT(req: Request, res: Response) {
        const token = req.headers.authorization;
        if (!token) return res.status(400);
        const [error ,updateNotificationDto] = jwtDto.create({token});
        if(error) return this.handleError(error, res)
        this.notificationRepository
            .updateNotificationsStatusJWT(updateNotificationDto!)
            .then((notification) => res.status(200).json(notification))
            .catch((error) => this.handleError(error, res));

    }
    getAllNotifications(req: Request, res: Response) {
         this.notificationRepository
            .getAllNotifications()
            .then((notification) => res.status(200).json(notification))
            .catch((error) => this.handleError(error, res));

    }

/*
    getAllUserNotifications(req: Request, res: Response) {
        const { userId } = req.params;
        const [error, getAllUserNotificationDto] = GetAllUserNotificationDto.create({ userId });
        if (error) return res.status(400).json({ error });
        this.notificationRepository
            .getAllUserNotifications(getAllUserNotificationDto!)
            .then((notification) => res.status(200).json(notification))
            .catch((error) => this.handleError(error, res));

    } */
}