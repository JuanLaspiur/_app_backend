export type NotificationType =  'info' | 'warning' | 'success' | 'error';

export class NotificationEntity {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly title: string,
        public readonly isRead: boolean = false,
        public readonly message: string,
        public readonly createdAt: Date = new Date(),
        public readonly type:string
    ){}

}