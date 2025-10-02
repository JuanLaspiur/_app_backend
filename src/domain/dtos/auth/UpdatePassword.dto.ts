export class UpdatePasswordDto {
  readonly id: string;
  readonly password: string;
  readonly newPassword: string;

  constructor(id: string, password: string, newPassword: string) {
    this.id = id;
    this.password = password;
    this.newPassword = newPassword;
  }

  static create(data: { id: string; password: string; newPassword: string }): UpdatePasswordDto {
    return new UpdatePasswordDto(data.id, data.password, data.newPassword);
  }
}
