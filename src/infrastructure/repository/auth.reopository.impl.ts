import { AuthDataSource, AuthRepository, UserEntity } from "../../domain";
import { LoginDto, RegisterDto } from "../../domain/dtos";


export class AuthRepositoryImpl implements AuthRepository {

    constructor(private readonly authdatasource : AuthDataSource){}

    async login(loginDto: LoginDto): Promise<UserEntity> {
        return this.authdatasource.login(loginDto);
    }
    async register(registerDto: RegisterDto): Promise<UserEntity> {
       return this.authdatasource.register(registerDto);
    }
}