import { Request, response, Response } from "express";
import { UserRepository, CustomError } from "../../domain";
import { GetUserByIdDto } from "../../domain/dtos";
import { UpdateUserDto } from "../../domain/dtos/user/updateUser.dto";

export class UserController {
    constructor(private readonly userRepository: UserRepository) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    getAllUsers(req: Request, res: Response) {
        this.userRepository.getAllUsers()
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res))
    }

    getAllActiveUsers(req: Request, res: Response) {
        this.userRepository.getAllActiveUsers()
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res))
    }

    getUserById(req: Request, res: Response) {
        const id = req.params.id;
        const [error, dto] = GetUserByIdDto.create({ userId: id });
        if (error) return res.status(400).json({ error });
        this.userRepository.getUserById(dto!)
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res))
    }

    updateUserById(req: Request, res: Response) {
        const id = req.params.id;
        const data = req.body
        const [error, dto] = UpdateUserDto.create({ id, ...data });
        if (error) return res.status(400).json({ error });
        this.userRepository.updateUserById(dto!)
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res))
    }

}