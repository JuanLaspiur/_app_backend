import { BcryptAdapter } from "../../config/bcrypt";
import { JwtAdapter } from "../../config/jwt";
import { UserModel } from "../../data/mogodb";
import { AuthDataSource, CustomError, UserEntity } from "../../domain";
import { LoginDto, RegisterDto, UpdatePasswordDto } from "../../domain/dtos";
import { UserMapper } from "../mappers/user.mapper";


type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


export class AuthDataSourceImpl implements AuthDataSource {

  constructor(private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare) { }

  
    async login(loginDto: LoginDto): Promise<UserEntity> {
    const { password, email } = loginDto;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.badRequest('User does not exist');
      if (!this.comparePassword(password, user.password))
        throw CustomError.unauthorized('Incorrect password');

      const token = JwtAdapter.sign({ id: user._id, role: user.role });

      user.session = {
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        lastLogin: new Date(),
      };
      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }



  async register(registerDto: RegisterDto): Promise<UserEntity> {
    try {
      const { firstName, lastName, password, email, username, phone } = registerDto;

      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest('User already exists');

      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        username,
        phone,
        password: await this.hashPassword(password),
        role: 'user',
        isActive: true,
      });

      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<UserEntity> {
    const { id, password, newPassword } = updatePasswordDto;

    try {
      const user = await UserModel.findById(id);
      if (!user) throw CustomError.badRequest('User not found');

      const isMatch = this.comparePassword(password, user.password);
      if (!isMatch) throw CustomError.unauthorized('Incorrect current password');

      user.password = await this.hashPassword(newPassword);
      await user.save();

      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }


}