import { UserModel } from "../../../data/mogodb";

export class GetAllActivesUseCase {
 static async execute() {
    return UserModel.find({ isActive: true });
  }
}