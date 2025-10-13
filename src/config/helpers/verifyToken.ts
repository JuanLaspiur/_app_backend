import jwt from "jsonwebtoken";
import { jwtDto } from "../../domain/dtos";

export const verifyToken = (dto: jwtDto): string => {
    if (!dto?.token) throw new Error("JWT token is required");
    try {
        const payload: any = jwt.verify(dto.token, process.env.JWT_SECRET!);
        return payload.id || payload.userId;
    } catch {
        throw new Error("Invalid or expired token");
    }
}