import { Request, Response } from "express";
import { CloseLogDto, jwtDto, OpenLogDto } from "../../domain/dtos";
import { CustomError, WorkDayLogRepository } from "../../domain";

export class WorkDayLogController {
  constructor(
    private readonly workLogRepository: WorkDayLogRepository,
    private readonly handleError: (error: unknown, res: Response, num?: number) => void
  ) { }

  async openLog(req: Request, res: Response) {
   
    try {
      const token = req.headers.authorization;
      const logId = req.params.id;

      if (!token) throw CustomError.badRequest("Missing token");

      const [errorJWT, dto] = jwtDto.create({ token });
      if (errorJWT || !dto) throw CustomError.badRequest("Invalid token: " + errorJWT);

      const [error, openLogDto] = OpenLogDto.create({ logId, entryToken: '4444' })

      if (error || !openLogDto) {
        throw CustomError.badRequest("Invalid entry token: " + error);
      }
      const log = await this.workLogRepository.openLog(dto, openLogDto);
      return res.status(200).json(log);

    } catch (error) {
       this.handleError(error, res);
    }
  }


  async closeLog(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      const logId = req.params.id;

      if (!token) throw CustomError.badRequest("Missing token");

      const [errorJWT, dto] = jwtDto.create({ token });
      if (errorJWT || !dto) throw CustomError.badRequest("Invalid token: " + errorJWT);

      const [error, closeLogDto] = CloseLogDto.create({ logId, entryToken: '4444' })

      if (error || !closeLogDto) {
        throw CustomError.badRequest("Invalid entry token: " + error);
      }

      const log = await this.workLogRepository.closeLog(dto, closeLogDto);
      return res.status(200).json(log);

    } catch (error) {
      this.handleError(error, res);
    }
  }


  async markAsAbsentLog(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      const logId = req.params.id;

      if (!token) throw CustomError.badRequest("Missing token");

      const [errorJWT, dto] = jwtDto.create({ token });
      if (errorJWT || !dto) throw CustomError.badRequest("Invalid token: " + errorJWT);

      if (!logId) throw CustomError.badRequest("Missing logId");

      const log = await this.workLogRepository.markAsAbsentLog(dto, logId);
      return res.status(200).json(log);

    } catch (error) {
      this.handleError(error, res);
    }
  }


  async getUserWorkWeekLogs(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;

      if (!token) throw CustomError.badRequest("Missing token");

      const [errorJWT, dto] = jwtDto.create({ token });
      if (errorJWT || !dto) throw CustomError.badRequest("Invalid token: " + errorJWT);

      const logs = await this.workLogRepository.getUserWorkWeekLogs(dto);
      return res.status(200).json(logs);

    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getTodayWorkLog(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      if (!token) throw CustomError.badRequest("Missing token");

      const [errorJWT, dto] = jwtDto.create({ token });
      if (errorJWT || !dto) throw CustomError.badRequest("Invalid token: " + errorJWT);


      const log = await this.workLogRepository.getTodayWorkLog(dto);
      return res.status(200).json(log);

    } catch (error) {
      this.handleError(error, res);
    }
  }





}
