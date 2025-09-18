import { Validators } from "../../../config";

export class LoginDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string | null, LoginDto | null] {
    const { email, password } = object;

    if (!email || typeof email !== 'string' || !Validators.email.test(email.trim())) {
      return ['Missing or invalid email', null];
    }

    if (!password || typeof password !== 'string' || !Validators.password.test(password)) {
      return ['Missing or invalid password (min 6 chars, at least 1 letter and 1 number)', null];
    }

    return [null, new LoginDto(email.trim(), password)];
  }
}
