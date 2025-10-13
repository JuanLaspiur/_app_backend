import { Request, Response } from "express";
import { jwtDto, SaveTokenDto, SendNotificationDto } from "../../domain/dtos";
import { PushNotificationRepository, CustomError } from "../../domain";

export class PushNotificationController {
    constructor(private readonly repository: PushNotificationRepository) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    saveToken(req: Request, res: Response) {
        const token = req.headers.authorization;
        if (!token) return res.status(400);
        const [errorToken, dto] = jwtDto.create({ token });
        if (errorToken) return res.status(400).json({ errorToken });

        const [error, saveTokenDto] = SaveTokenDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.repository.saveToken(dto!, saveTokenDto!).
            then(notification => res.status(200).json(notification))
            .catch(error => this.handleError(error, res));

    }

    getTokensByUser(req: Request, res: Response) {
        const token = req.headers.authorization;
        if (!token) return res.status(400);
        const [errorToken, dto] = jwtDto.create({ token });
        if (errorToken) return res.status(400).json({ errorToken });

        this.repository.getTokensByUser(dto!).
            then(notification => res.status(200).json(notification))
            .catch(error => this.handleError(error, res));
    }


    /*
    Falta inplementar sendNotification
      */
}