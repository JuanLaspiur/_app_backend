import { UserEntity } from "../../domain";
import { UserDataSource } from "../../domain/datasources/user.datasource";
import { GetUserByIdDto } from "../../domain/dtos";
import { UpdateUserDto } from "../../domain/dtos/user/updateUser.dto";
import { UserRepository } from "../../domain/repository/user.repository";

export class UserRepositoryImpl implements UserRepository {
    constructor(private readonly userDataSource: UserDataSource) {

    }

    getAllUsers(): Promise<UserEntity | UserEntity[]> {
        return this.userDataSource.getAllUsers();
    }
    getUserById(dto: GetUserByIdDto): Promise<UserEntity | null> {
        return this.userDataSource.getUserById(dto);
    }

    updateUserById(dto: UpdateUserDto): Promise<UserEntity> {
        return this.userDataSource.updateUserById(dto);
    }

}