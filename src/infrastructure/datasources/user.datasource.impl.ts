import { UserModel } from "../../data/mogodb";
import { CustomError, UserEntity } from "../../domain";
import { UserDataSource } from "../../domain/datasources/user.datasource";
import { GetUserByIdDto } from "../../domain/dtos";
import { UpdateUserDto } from "../../domain/dtos/user/updateUser.dto";
import { UserMapper } from "../mappers/user.mapper";

export class UserDataSourceImpl implements UserDataSource {
  constructor(
    private readonly handleError: (error: unknown) => never
  ) { }

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      const users = await UserModel.find()
      return UserMapper.toEntities(users);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllActiveUsers(): Promise<UserEntity[]> {
    try {
      const users = await UserModel.find({ isActive: true });
      return UserMapper.toEntities(users);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserById(dto: GetUserByIdDto): Promise<UserEntity> {
    try {
      const user = await UserModel.findById(dto.userId);
      if (!user) throw CustomError.notFound("User not found");
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateUserById(dto: UpdateUserDto): Promise<UserEntity> {
    try {
      const { id, ...updateData } = dto;
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );

      if (!updatedUser) throw CustomError.notFound("User not found");
      return UserMapper.userEntityFromObject(updatedUser);
    } catch (error) {
      this.handleError(error);
    }
  }
}
