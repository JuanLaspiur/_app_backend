import { Request, Response } from "express";
import { jwtDto, SaveTokenDto } from "../../domain/dtos";
import { PushNotificationRepository, CustomError } from "../../domain";

export class PushNotificationController {
  constructor(
    private readonly repository: PushNotificationRepository,
    private readonly handleError: (error: unknown, res: Response, num?: number) => void
  ) {}

  saveToken(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token)
      return this.handleError(CustomError.badRequest("Missing authorization token"), res, 1);

    const [errorToken, jwtPayload] = jwtDto.create({ token });
    if (errorToken)
      return this.handleError(CustomError.badRequest(errorToken), res, 2);

    const [error, saveTokenDto] = SaveTokenDto.create(req.body);
    if (error)
      return this.handleError(CustomError.badRequest(error), res, 3);

    this.repository
      .saveToken(jwtPayload!, saveTokenDto!)
      .then((notification) => res.status(200).json(notification))
      .catch((error) => this.handleError(error, res, 4));
  }

  getTokensByUser(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token)
      return this.handleError(CustomError.badRequest("Missing authorization token"), res, 1);

    const [errorToken, jwtPayload] = jwtDto.create({ token });
    if (errorToken)
      return this.handleError(CustomError.badRequest(errorToken), res, 2);

    this.repository
      .getTokensByUser(jwtPayload!)
      .then((tokens) => res.status(200).json(tokens))
      .catch((error) => this.handleError(error, res, 3));
  }
}
