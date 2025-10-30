import { UserModel } from "../../../data/mogodb";

export class GetAllActives {
 static async execute() {
    return UserModel.find({ isActive: true });
  }
}