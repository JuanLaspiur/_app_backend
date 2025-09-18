// domain/entities/user.entity.ts

export interface UserSession {
  token: string;
  expiresAt: Date;
  lastLogin: Date;
}

export class UserEntity {
  constructor(
    public readonly id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,       // en la entidad real sería hash
    public role: 'admin' | 'user' | 'moderator' = 'user',
    public username?: string,
    public phone?: string,
    public isActive: boolean = true,
    public avatarUrl?: string,
    public session?: UserSession,
    public jobTitle?: string,
    public location?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
  
 
}
