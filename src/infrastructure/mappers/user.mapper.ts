import { CustomError, UserEntity, UserSession } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }): UserEntity {
    const {
      _id,
      id,
      firstName,
      lastName,
      email,
      password,
      role,
      username,
      phone,
      isActive = true,
      avatarUrl,
      session,
      jobTitle,
      location,
      createdAt,
      updatedAt
    } = object;

    const userId = (_id?.toString() || id?.toString());
    if (!userId) {
      throw CustomError.badRequest("Missing id");
    }

    if (!firstName || typeof firstName !== "string") {
      throw CustomError.badRequest("Missing or invalid firstName");
    }

    if (!lastName || typeof lastName !== "string") {
      throw CustomError.badRequest("Missing or invalid lastName");
    }

    if (!email || typeof email !== "string") {
      throw CustomError.badRequest("Missing or invalid email");
    }

    // Mapear session si existe
    let userSession: UserSession | undefined;
    if (session) {
      userSession = {
        token: session.token,
        expiresAt: new Date(session.expiresAt),
        lastLogin: new Date(session.lastLogin),
      };
    }

    return new UserEntity(
      userId,
      firstName,
      lastName,
      email,
      password,
      role || 'user',
      username,
      phone,
      isActive,
      avatarUrl,
      userSession,
      jobTitle,
      location,
      createdAt ? new Date(createdAt) : new Date(),
      updatedAt ? new Date(updatedAt) : new Date()
    );
  }

    static toEntities(objects: any[]): UserEntity[] {
    return objects.map(obj => this.userEntityFromObject(obj));
  }
}
