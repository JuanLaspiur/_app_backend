import { Request, Response } from "express";
import { UserRepository, CustomError } from "../../domain";
import { GetUserByIdDto } from "../../domain/dtos";
import { UpdateUserDto } from "../../domain/dtos/user/updateUser.dto";
import { processImage } from "../../config/helpers/processImage";

export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly handleError: (error: unknown, res: Response, num?: number) => void
  ) {}

  getAllUsers(req: Request, res: Response) {
    this.userRepository
      .getAllUsers()
      .then((users) => res.status(200).json(users))
      .catch((error) => {
       this.handleError(error, res, 1)});
  }

  getAllActiveUsers(req: Request, res: Response) {
    this.userRepository
      .getAllActiveUsers()
      .then((users) => res.status(200).json(users))
      .catch((error) => this.handleError(error, res, 2));
  }

  getUserById(req: Request, res: Response) {
    const id = req.params.id;
    const [error, dto] = GetUserByIdDto.create({ userId: id });
    if (error) return this.handleError(CustomError.badRequest(error), res, 3);

    this.userRepository
      .getUserById(dto!)
      .then((user) => res.status(200).json(user))
      .catch((error) => this.handleError(error, res, 4));
  }

  updateUserById(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    const [error, dto] = UpdateUserDto.create({ id, ...data });
    if (error) return this.handleError(CustomError.badRequest(error), res, 5);

    this.userRepository
      .updateUserById(dto!)
      .then((user) => res.status(200).json(user))
      .catch((error) => this.handleError(error, res, 6));
  }

  uploadImage(req: Request, res: Response) {
    const file = req.file as Express.Multer.File | undefined;
    if (!file)
      return this.handleError(CustomError.badRequest("No file uploaded"), res, 7);

    processImage(file)
      .then((fileInfo) =>
        res.status(201).json({ message: "File uploaded", file: fileInfo })
      )
      .catch((error) => this.handleError(error, res, 8));
  }

  uploadImageToUser(req: Request, res: Response) {
    const file = req.file as Express.Multer.File | undefined;
    if (!file)
      return this.handleError(CustomError.badRequest("No file uploaded"), res, 9);

    const userId = req.params.id;

    processImage(file, userId)
      .then((fileInfo) => {
        const [error, dto] = UpdateUserDto.create({
          id: userId,
          avatarUrl: fileInfo.url,
        });
        if (error) throw CustomError.badRequest(error);

        return this.userRepository
          .updateUserById(dto!)
          .then((updatedUser) =>
            res.status(200).json({
              message: "File uploaded, converted to webp and user updated",
              file: fileInfo,
              user: updatedUser,
            })
          );
      })
      .catch((error) => this.handleError(error, res, 10));
  }
}
