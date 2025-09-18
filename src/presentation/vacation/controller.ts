import { Request, Response } from "express";
import { CreateVacationDto, UpdateVacationDto } from "../../domain/dtos";
import { VacationRepository, CustomError } from "../../domain";
import { GetAllUserVacationDto } from "../../domain/dtos/vacation/getAllUserVacation";

export class VacationController {
  constructor(private readonly vacationRepository : VacationRepository) {}

  private handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}

createVacation(req: Request, res: Response) {
        const [error, createVacationDto] = CreateVacationDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
         this.vacationRepository.createVacation(createVacationDto!)
         .then(vacation=> res.status(200).json(vacation))
         .catch(error => this.handleError(error, res))
    }

 updateVacation(req: Request, res: Response) {
        const [error, updateVacationDto] = UpdateVacationDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
         this.vacationRepository.updateVacation(updateVacationDto!)
         .then(vacation=> res.status(200).json(vacation))
         .catch(error => this.handleError(error, res))
    }   

    
    getAllVacations(req: Request, res: Response) {
         this.vacationRepository
            .getAllVacations()
            .then((vacation) => res.status(200).json(vacation))
            .catch((error) => this.handleError(error, res));

    }

   getAllUserVacations(req: Request, res: Response) {
        const [error, getAllUserVacations] = GetAllUserVacationDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
         this.vacationRepository.getAllUserVacations(getAllUserVacations!)
         .then(vacation=> res.status(200).json(vacation))
         .catch(error => this.handleError(error, res))
    }    
    
}