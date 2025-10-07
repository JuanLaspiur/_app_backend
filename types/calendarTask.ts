export interface CalendarTask {
    id:string;
    title: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    userId?: string | number;
    createdAt?: string,
    updatedAt?: string,
}