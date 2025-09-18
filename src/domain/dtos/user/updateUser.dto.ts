export class UpdateUserDto {
  readonly id: string;

  readonly firstName?: string;
  readonly lastName?: string;
  readonly username?: string;
  readonly phone?: string;
  readonly email?: string;
  readonly password?: string;
  readonly role?: 'admin' | 'user' | 'moderator';
  readonly isActive?: boolean;
  readonly avatarUrl?: string;
  readonly jobTitle?: string;
  readonly location?: string;

  private constructor(data: {
    id: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    phone?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'user' | 'moderator';
    isActive?: boolean;
    avatarUrl?: string;
    jobTitle?: string;
    location?: string;
  }) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.phone = data.phone;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.isActive = data.isActive;
    this.avatarUrl = data.avatarUrl;
    this.jobTitle = data.jobTitle;
    this.location = data.location;
  }

  static create(data: {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    phone?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'user' | 'moderator';
    isActive?: boolean;
    avatarUrl?: string;
    jobTitle?: string;
    location?: string;
  }): [string | null, UpdateUserDto | null] {
    if (!data.id) {
      return ["id is required", null];
    }
    try {
      const dto = new UpdateUserDto(data as { id: string });
      return [null, dto];
    } catch (err: any) {
      return [err.message || "Unknown error", null];
    }
  }
}
