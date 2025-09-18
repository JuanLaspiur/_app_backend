export interface Vacation {
  id: string;
  userId: number;
  totalDays: number;
  usedDays: number;
  startDate: string; 
  endDate: string;   
  status: 'pendiente' | 'aprobada' | 'rechazada';
  createdAt: string;
  updatedAt: string;
}
