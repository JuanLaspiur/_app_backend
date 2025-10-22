import jwt from "jsonwebtoken";
import { jwtDto } from "../../domain/dtos";
import { CustomError } from "../../domain";
import { envs } from "../env";

export const verifyToken = (dto: jwtDto): string => {
    if (!dto?.token) throw CustomError.unauthorized("JWT token is required");
    try {
        const payload: any = jwt.verify(dto.token, envs.JWT_SECRET);
        return payload.id || payload.userId;
    } catch {
        throw CustomError.unauthorized('Invalid token')
    }
}