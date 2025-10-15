import { Request, Response } from "express";
import { jwtDto } from "../../domain/dtos";
import { CustomError, WorkLogRepository } from "../../domain";

export class WorkLogController {
    
    constructor(
        private readonly workLogRepository: WorkLogRepository,
        private readonly handleError: (error: unknown, res: Response, num?: number) => void
    ) { }



    async createWorkSchedule(req: Request, res: Response) {

    }



    async updateWorkSchedule(req: Request, res: Response) {
   
    }



    async getAllUserWorkSchedule(req: Request, res: Response) {
 
    }



     async deleteWorkSchedule(req: Request, res: Response) {
  
    }



    async deleteAllUserWorkSchedules(req: Request, res: Response) {

}
}