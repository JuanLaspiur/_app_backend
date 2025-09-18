// domain/dto/vacation/update-vacation.dto.ts
import { VacationStatus } from "../../entities/vacation.entity";

export interface UpdateVacationDtoProps {
  id: string;
  userId?: number;
  totalDays?: number;
  usedDays?: number;
  startDate?: string;
  endDate?: string;
  status?: VacationStatus;
}

export class UpdateVacationDto {
  private constructor(
    public readonly id: string,
    public readonly userId?: number,
    public readonly totalDays?: number,
    public readonly usedDays?: number,
    public readonly startDate?: string,
    public readonly endDate?: string,
    public readonly status?: VacationStatus
  ) {}

  static create(object: { [key: string]: any }): [string | null, UpdateVacationDto | null] {
    const { id, userId, totalDays, usedDays, startDate, endDate, status } = object;

    if (!id || typeof id !== "string") {
      return ["Missing or invalid id", null];
    }

    if (userId !== undefined && typeof userId !== "number") {
      return ["Invalid userId", null];
    }

    if (totalDays !== undefined && (typeof totalDays !== "number" || totalDays <= 0)) {
      return ["Invalid totalDays", null];
    }

    if (usedDays !== undefined && (typeof usedDays !== "number" || usedDays < 0)) {
      return ["Invalid usedDays", null];
    }

    if (startDate !== undefined && isNaN(Date.parse(startDate))) {
      return ["Invalid startDate", null];
    }

    if (endDate !== undefined && isNaN(Date.parse(endDate))) {
      return ["Invalid endDate", null];
    }

    const validStatus: VacationStatus[] = ["pendiente", "aprobada", "rechazada"];
    if (status !== undefined && !validStatus.includes(status)) {
      return ["Invalid status", null];
    }

    return [
      null,
      new UpdateVacationDto(id, userId, totalDays, usedDays, startDate, endDate, status)
    ];
  }
}
