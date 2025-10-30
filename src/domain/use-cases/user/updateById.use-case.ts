import { User } from "../../../../types/user";
import { UserModel } from "../../../data/mogodb";

export class UpdateUserById {
static  async execute(userId: string, updateData: Partial<User>) {
    return UserModel.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
  }
}