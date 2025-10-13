import { Request, Response } from "express";
import { RegisterDto, LoginDto, UpdatePasswordDto } from "../../domain/dtos";
import { AuthRepository, CustomError } from "../../domain";

export class AuthController {
  constructor(
    private readonly authRepository: AuthRepository,
     private readonly handleError: (error: unknown, res: Response, num?: number) => void
  ) { }


  register(req: Request, res: Response) {
    const [error, registerDto] = RegisterDto.create(req.body);
    if (error) {
      return  this.handleError(error, res, 1);
    }
    this.authRepository.register(registerDto!)
      .then(user => res.status(200).json(user))
      .catch(error => this.handleError(error, res, 2))

  }

  login(req: Request, res: Response) {
    const [error, loginDto] = LoginDto.create(req.body);
    if (error) {
       return this.handleError(error, res, 1);
    }
    this.authRepository.login(loginDto!)
      .then(user => res.status(200).json(user))
      .catch(error =>this.handleError(error, res, 2));
  }



  updatePassword(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body
    const [error, updatePasswordDto] = UpdatePasswordDto.create({ id, ...data });
    if (error) {
        return this.handleError(error, res, 1);
    }
    this.authRepository.updatePassword(updatePasswordDto!)
      .then(user => res.status(200).json(user))
      .catch(error => this.handleError(error, res,2));
  }


}
