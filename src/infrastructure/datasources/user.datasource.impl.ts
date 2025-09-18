import { UserModel } from "../../data/mogodb";
import { CustomError, UserEntity } from "../../domain";
import { UserDataSource } from "../../domain/datasources/user.datasource";
import { GetUserByIdDto } from "../../domain/dtos";
import { UpdateUserDto } from "../../domain/dtos/user/updateUser.dto";
import { UserMapper } from "../mappers/user.mapper";

export class UserDataSourceImpl implements UserDataSource {


    async getAllUsers(): Promise<UserEntity[]> {
        const users = await UserModel.find();
        return UserMapper.toEntities(users);
    }

    async getUserById(dto: GetUserByIdDto): Promise<UserEntity | null> {
        const user = await UserModel.findById(dto.userId);
        if (!user) return null;
        return UserMapper.userEntityFromObject(user);
    }
    async updateUserById(dto: UpdateUserDto): Promise<UserEntity> {
        try {
            const { id, ...updateData } = dto;
            const updatedUser = await UserModel.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true }
            );

            if (!updatedUser) {
                throw CustomError.notFound("User not found");
            }

            return UserMapper.userEntityFromObject(updatedUser);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

}
