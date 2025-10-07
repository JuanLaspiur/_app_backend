export class CalendarTaskEntity {
    constructor(
        public readonly id : string,
        public readonly title : string,
        public readonly userId : string,
        public readonly date : string,
        public readonly startTime : string,
        public readonly endTime : string,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date(),
    ){}
}