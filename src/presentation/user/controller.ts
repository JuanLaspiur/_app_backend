import { Request, Response } from "express";
import { UserRepository, CustomError } from "../../domain";
import { GetUserByIdDto } from "../../domain/dtos";
import { UpdateUserDto } from "../../domain/dtos/user/updateUser.dto";
import { processImage } from "../../config/helpers/processImage";

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


async uploadImage(req: Request, res: Response) {
  try {
    const file = req.file as Express.Multer.File | undefined;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const fileInfo = await processImage(file);

    return res.status(201).json({ message: "File uploaded", file: fileInfo });
  } catch (err: any) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: err.message ?? "Server error" });
  }
}


async uploadImageToUser(req: Request, res: Response) {
    try {
     console.log('Entre file '+req.file) 
     console.log('Incoming content-type:', req.headers['content-type']);
    const file = req.file as Express.Multer.File | undefined;
    console.log('file ', file)
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const userId = req.params.id;
    const fileInfo = await processImage(file);

    const [error, dto] = UpdateUserDto.create({
      id: userId,
      avatarUrl: fileInfo.url,
    });
    if (error) return res.status(400).json({ error });

    const updatedUser = await this.userRepository.updateUserById(dto!);

    return res.status(200).json({
      message: "File uploaded, converted to webp and user updated",
      file: fileInfo,
      user: updatedUser,
    });
  } catch (err: any) {
    console.error("UploadToUser error:", err);
    return res.status(500).json({ message: err.message ?? "Server error" });
  }
}

}