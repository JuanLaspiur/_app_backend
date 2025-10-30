import { CustomError, UserEntity, UserDataSource } from "../../domain";
import { GetUserByIdDto, UpdateUserDto } from "../../domain/dtos";
import { UserMapper } from "../mappers/user.mapper";
import * as userUseCase from "../../domain/use-cases/user";

export class UserDataSourceImpl implements UserDataSource {
  constructor(
    private readonly handleError: (error: unknown) => never
  ) {}

  private async executeUseCase<T>(useCase: { execute: () => Promise<T> }): Promise<T> {
    return useCase.execute();
  }

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      const useCase = new userUseCase.GetAllUsersUseCase();
      const users = await this.executeUseCase(useCase);
      return UserMapper.toEntities(users);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllActiveUsers(): Promise<UserEntity[]> {
    try {
      const useCase = new userUseCase.GetAllActiveUsersUseCase();
      const users = await this.executeUseCase(useCase);
      return UserMapper.toEntities(users);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserById(dto: GetUserByIdDto): Promise<UserEntity> {
    try {
      const useCase = new userUseCase.GetUserByIdUseCase();
      const user = await useCase.execute(dto.userId);
      if (!user) throw CustomError.notFound("User not found");
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateUserById(dto: UpdateUserDto): Promise<UserEntity> {
    try {
      const { id, ...updateData } = dto;
      const useCase = new userUseCase.UpdateUserByIdUseCase();
      const updatedUser = await useCase.execute(id, updateData);
      if (!updatedUser) throw CustomError.notFound("User not found");
      return UserMapper.userEntityFromObject(updatedUser);
    } catch (error) {
      this.handleError(error);
    }
  }
}