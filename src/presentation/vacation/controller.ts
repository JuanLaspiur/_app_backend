import { Request, Response } from "express";
import { CreateVacationDto, UpdateVacationDto } from "../../domain/dtos";
import { VacationRepository, CustomError } from "../../domain";
import { GetAllUserVacationDto } from "../../domain/dtos/vacation/getAllUserVacation";

// TO DO ver 

export class VacationController {
  constructor(
    private readonly vacationRepository: VacationRepository,
    private readonly handleError: (error: unknown, res: Response, num?: number) => void
  ) {}

  async createVacation(req: Request, res: Response) {
    try {
      const [error, createVacationDto] = CreateVacationDto.create(req.body);
      if (error || !createVacationDto) {
        throw CustomError.badRequest("Invalid vacation data: " + error);
      }

      const vacation = await this.vacationRepository.createVacation(createVacationDto);
      return res.status(201).json(vacation);

    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateVacation(req: Request, res: Response) {
    try {
      const [error, updateVacationDto] = UpdateVacationDto.create(req.body);
      if (error || !updateVacationDto) {
        throw CustomError.badRequest("Invalid update data: " + error);
      }

      const vacation = await this.vacationRepository.updateVacation(updateVacationDto);
      return res.status(200).json(vacation);

    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getAllVacations(_req: Request, res: Response) {
    try {
      const vacations = await this.vacationRepository.getAllVacations();
      return res.status(200).json(vacations);

    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getAllUserVacations(req: Request, res: Response) {
    try {
      const [error, getAllUserVacationsDto] = GetAllUserVacationDto.create(req.body);
      if (error || !getAllUserVacationsDto) {
        throw CustomError.badRequest("Invalid user vacation request: " + error);
      }

      const vacations = await this.vacationRepository.getAllUserVacations(getAllUserVacationsDto);
      return res.status(200).json(vacations);

    } catch (error) {
      this.handleError(error, res);
    }
  }
}
