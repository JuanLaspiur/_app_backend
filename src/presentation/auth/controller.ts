import { Request, Response } from "express";
import { RegisterDto, LoginDto } from "../../domain/dtos";
import { AuthRepository, CustomError } from "../../domain";

export class AuthController {
constructor(private readonly authRepository: AuthRepository) {}

private handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}



    register(req: Request, res: Response) {
        const [error, registerDto] = RegisterDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
         this.authRepository.register(registerDto!)
         .then(user=> res.status(200).json(user))
         .catch(error => this.handleError(error, res))
        
        
       
    }

    login(req: Request, res: Response) {
        const [error, loginDto] = LoginDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
       this.authRepository.login(loginDto!)
       .then(user=> res.status(200).json(user))
       .catch(error => this.handleError(error, res));
    }

}
