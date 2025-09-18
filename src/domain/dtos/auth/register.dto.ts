import { Validators } from "../../../config";

export interface RegisterDtoProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username?: string;
  phone?: string;
}

export class RegisterDto {
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly username?: string,
    public readonly phone?: string
  ) {}

  static create(object: { [key: string]: any }): [string | null, RegisterDto | null] {
    const { firstName, lastName, email, password, username, phone } = object;

    if (!firstName || typeof firstName !== 'string') {
      return ['Missing or invalid firstName', null];
    }

    if (!lastName || typeof lastName !== 'string') {
      return ['Missing or invalid lastName', null];
    }

    if (!email || typeof email !== 'string' || !Validators.email.test(email.trim())) {
      return ['Missing or invalid email', null];
    }

    if (!password || typeof password !== 'string' || !Validators.password.test(password)) {
      return ['Missing or invalid password (min 6 chars, at least 1 letter and 1 number)', null];
    }

    if (username && typeof username !== 'string') {
      return ['Invalid username', null];
    }

    if (phone && typeof phone !== 'string') {
      return ['Invalid phone', null];
    }

    return [
      null,
      new RegisterDto(
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        password,
        username?.trim(),
        phone?.trim()
      )
    ];
  }
}
