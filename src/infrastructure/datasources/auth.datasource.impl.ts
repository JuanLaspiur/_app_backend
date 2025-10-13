import { BcryptAdapter } from "../../config/bcrypt";
import { JwtAdapter } from "../../config/jwt";
import { UserModel } from "../../data/mogodb";
import { AuthDataSource, CustomError, UserEntity } from "../../domain";
import { LoginDto, RegisterDto, UpdatePasswordDto } from "../../domain/dtos";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => Promise<string> | string;
type CompareFunction = (password: string, hashed: string) => Promise<boolean> | boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly handleError: (error: unknown) => never,
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    
  ) {}


 
  private async findUserByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.badRequest("User does not exist");
    return user;
  }


  async login({ email, password }: LoginDto): Promise<UserEntity> {
    try {
      const user = await this.findUserByEmail(email);
      const valid = await this.comparePassword(password, user.password);

      if (!valid) throw CustomError.unauthorized("Incorrect password");

      const token = JwtAdapter.sign({ id: user._id, role: user.role });
      user.session = {
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        lastLogin: new Date(),
      };
      await user.save();
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      this.handleError(error);
    }
  }


  async register({ firstName, lastName, password, email, username, phone }: RegisterDto): Promise<UserEntity> {
    try {
      const exists = await UserModel.exists({ email });
      if (exists) throw CustomError.badRequest("User already exists");

      const hashedPassword = await this.hashPassword(password);
      const user = new UserModel({
        firstName,
        lastName,
        email,
        username,
        phone,
        password: hashedPassword,
        role: "user",
        isActive: true,
      });

      await user.save();
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updatePassword({ id, password, newPassword }: UpdatePasswordDto): Promise<UserEntity> {
    try {
      const user = await UserModel.findById(id);
      if (!user) throw CustomError.badRequest("User not found");

      const valid = await this.comparePassword(password, user.password);
      if (!valid) throw CustomError.unauthorized("Incorrect current password");

      user.password = await this.hashPassword(newPassword);
      await user.save();
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      this.handleError(error);
    }
  }
}
