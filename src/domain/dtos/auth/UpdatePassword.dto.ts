export class UpdatePasswordDto {
  readonly id: string;
  readonly password: string;
  readonly newPassword: string;

  constructor(id: string, password: string, newPassword: string) {
    this.id = id;
    this.password = password;
    this.newPassword = newPassword;
  }

  static create(data: { id: string; password: string; newPassword: string }): [string | null, UpdatePasswordDto | null] {
    const { id, password, newPassword } = data;

    if (!id) return ['Missing id', null];
    if (!password) return ['Missing current password', null];
    if (!newPassword) return ['Missing new password', null];
    if (newPassword.length < 8) return ['New password must be at least 8 characters', null];

    return [null, new UpdatePasswordDto(id, password, newPassword)];
  }
}
