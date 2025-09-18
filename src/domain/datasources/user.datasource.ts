import { GetUserByIdDto } from "../dtos";
import { UpdateUserDto } from "../dtos/user/updateUser.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserDataSource{
    abstract getAllUsers():Promise<UserEntity|UserEntity[]>;
    abstract getAllActiveUsers():Promise<UserEntity|UserEntity[]>;
    abstract getUserById(dto:GetUserByIdDto):Promise<UserEntity>;
    abstract updateUserById(dto:UpdateUserDto) : Promise<UserEntity>; 
// abstract updateUserByJWT(dto:UpdateUserByJWTDto) : Promise<UserEntity>; 
}