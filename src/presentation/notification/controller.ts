import { Request, Response } from "express";
import { jwtDto, CreateNotificationDto, UpdateNotificationDto } from "../../domain/dtos";
import { NotificationRepository, CustomError } from "../../domain";

export class NotificationController {
    constructor(
        private readonly notificationRepository: NotificationRepository,
        private readonly handleError: (error: unknown, res: Response, num?: number) => void
    ) { }

    createNotification(req: Request, res: Response) {
        const [error, createNotificationDto] = CreateNotificationDto.create(req.body);
        if (error || !createNotificationDto)
            return this.handleError(CustomError.badRequest(`${error}`), res, 1);

        this.notificationRepository
            .createNotification(createNotificationDto)
            .then(notification => res.status(201).json(notification))
            .catch(error => this.handleError(error, res, 2));
    }

    updateNotification(req: Request, res: Response) {
        const { id } = req.params;
        const [error, updateNotificationDto] = UpdateNotificationDto.create(req.body);
        if (error || !updateNotificationDto)
            return this.handleError(CustomError.badRequest(`${error}`), res, 1);

        this.notificationRepository
            .updateNotification(id, updateNotificationDto)
            .then(notification => res.status(200).json(notification))
            .catch(error => this.handleError(error, res, 2));
    }

    updateNotificationsStatusJWT(req: Request, res: Response) {
        const token = req.headers.authorization;
        if (!token)
            return this.handleError(CustomError.badRequest("Missing token"), res, 1);

        const [error, updateNotificationDto] = jwtDto.create({ token });
        if (error || !updateNotificationDto)
            return this.handleError(CustomError.unauthorized(`${error}`), res, 2);

        this.notificationRepository
            .updateNotificationsStatusJWT(updateNotificationDto)
            .then(notification => res.status(200).json(notification))
            .catch(error => this.handleError(error, res, 3));
    }

    getAllNotifications(req: Request, res: Response) {
        this.notificationRepository
            .getAllNotifications()
            .then(notifications => res.status(200).json(notifications))
            .catch(error => this.handleError(error, res, 1));
    }

}