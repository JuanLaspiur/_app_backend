import { VacationStatus } from '../../entities/vacation.entity';

export interface VacationDtoProps {
  userId: number;
  totalDays: number;
  usedDays: number;
  startDate: string;  
  endDate: string;   
  status?: VacationStatus;
}

export class VacationDto {
  private constructor(
    public readonly userId: number,
    public readonly totalDays: number,
    public readonly usedDays: number,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly status: VacationStatus = 'pendiente'
  ) {}

  static create(object: { [key: string]: any }): [string | null, VacationDto | null] {
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

    const validStatus: VacationStatus[] = ['pendiente', 'aprobada', 'rechazada'];
    if (status && !validStatus.includes(status)) {
      return ['Invalid status', null];
    }

    return [
      null,
      new VacationDto(
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
