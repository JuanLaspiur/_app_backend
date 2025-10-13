import { CustomError } from "../../domain";

export function handleError(error: unknown): never {
    if (error instanceof CustomError) throw error;
    throw CustomError.internalServer();
}
