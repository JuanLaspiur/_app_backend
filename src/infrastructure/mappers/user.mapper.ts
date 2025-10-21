import { CustomError, UserEntity, UserSession, TeamMemberEntity } from "../../domain";

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
      isEmailVerified = false, 
      avatarUrl,
      session,
      jobTitle,
      location,
      teamMember,
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

    if (!password || typeof password !== "string") {
      throw CustomError.badRequest("Missing or invalid password");
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

    // Mapear teamMember si viene populado
    let teamMemberEntity: TeamMemberEntity | string | undefined;
    if (teamMember) {
      if (typeof teamMember === "object") {
        teamMemberEntity = new TeamMemberEntity(
          teamMember.id?.toString() || teamMember._id?.toString(),
          teamMember.userId,
          teamMember.position,
          teamMember.roleLevel,
          teamMember.salary,
          teamMember.jobDescription,
          teamMember.startDate ? new Date(teamMember.startDate) : new Date(),
          teamMember.createdAt ? new Date(teamMember.createdAt) : new Date(),
          teamMember.updatedAt ? new Date(teamMember.updatedAt) : new Date()
        );
      } else {
        teamMemberEntity = teamMember.toString();
      }
    }

    return new UserEntity(
      userId,
      firstName,
      lastName,
      email,
      password,
      role || "user",
      username,
      phone,
      isActive,
      isEmailVerified, 
      avatarUrl,
      userSession,
      jobTitle,
      location,
      teamMemberEntity,
      createdAt ? new Date(createdAt) : new Date(),
      updatedAt ? new Date(updatedAt) : new Date()
    );
  }

  static toEntities(objects: any[]): UserEntity[] {
    return objects.map((obj) => this.userEntityFromObject(obj));
  }
}
