
export type VacationStatus = 'pendiente' | 'aprobada' | 'rechazada';

export class VacationEntity {
  constructor(
    public readonly id: string,
    public readonly userId: number,
    public readonly totalDays: number,
    public readonly usedDays: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly status: VacationStatus = 'pendiente',
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}

  get remainingDays(): number {
    return this.totalDays - this.usedDays;
  }
}
