import { VacationStatus } from "../../entities/vacation.entity";

export interface CreateVacationDtoProps {
  userId: number;
  totalDays: number;
  usedDays: number;
  startDate: string;
  endDate: string;
  status?: VacationStatus;
}

export class CreateVacationDto {
  private constructor(
    public readonly userId: number,
    public readonly totalDays: number,
    public readonly usedDays: number,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly status: 'pendiente' | 'aprobada' | 'rechazada' = 'pendiente',
  ) {}

  static create(object: { [key: string]: any }): [string | null, CreateVacationDto | null] {
    const { userId, totalDays, usedDays, startDate, endDate, status } = object;

    if (userId === undefined || typeof userId !== 'number') {
      return ['Missing or invalid userId', null];
    }

    if (totalDays === undefined || typeof totalDays !== 'number' || totalDays <= 0) {
      return ['Missing or invalid totalDays', null];
    }

    if (usedDays === undefined || typeof usedDays !== 'number' || usedDays < 0) {
      return ['Missing or invalid usedDays', null];
    }

    if (!startDate || isNaN(Date.parse(startDate))) {
      return ['Missing or invalid startDate', null];
    }

    if (!endDate || isNaN(Date.parse(endDate))) {
      return ['Missing or invalid endDate', null];
    }

    const validStatus = ['pendiente', 'aprobada', 'rechazada'];
    if (status && !validStatus.includes(status)) {
      return ['Invalid status', null];
    }

    return [
      null,
      new CreateVacationDto(
        userId,
        totalDays,
        usedDays,
        startDate,
        endDate,
        status || 'pendiente'
      )
    ];
  }
}
