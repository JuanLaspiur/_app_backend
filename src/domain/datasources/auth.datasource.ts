import { LoginDto, RegisterDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDataSource{
    abstract login(loginDto: LoginDto):Promise<UserEntity>;
    abstract register(registerDto: RegisterDto):Promise<UserEntity>;
}