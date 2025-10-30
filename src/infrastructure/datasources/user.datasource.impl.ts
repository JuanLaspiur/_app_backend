import { CustomError, UserEntity, UserDataSource } from "../../domain";
import { GetUserByIdDto, UpdateUserDto } from "../../domain/dtos";
import { UserMapper } from "../mappers/user.mapper";
import * as userUseCase from "../../domain/use-cases/user";

export class UserDataSourceImpl implements UserDataSource {
  constructor(
    private readonly handleError: (error: unknown) => never
  ) { }
  // ***********************************************+
  // TO DO agregar authorize JWT Token a todo esto
  // ***********************************************+

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      const users = await userUseCase.GetAllUsers.execute();
      return UserMapper.toEntities(users);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllActiveUsers(): Promise<UserEntity[]> {
    try {
      const users = await userUseCase.GetAllActives.execute();
      return UserMapper.toEntities(users);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserById(dto: GetUserByIdDto): Promise<UserEntity> {
    try {
      const user = await userUseCase.GetUserById.execute(dto.userId);
      if (!user) throw CustomError.notFound("User not found");
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateUserById(dto: UpdateUserDto): Promise<UserEntity> {
    try {
      const { id, ...updateData } = dto;
      const updatedUser = await userUseCase.UpdateUserById.execute(id, updateData);
      if (!updatedUser) throw CustomError.notFound("User not found");
      return UserMapper.userEntityFromObject(updatedUser);
    } catch (error) {
      this.handleError(error);
    }
  }
}