export type Platform = 'android' | 'ios' | 'web';

export class PushNotificationEntity {
  constructor(
    public readonly id : string,
    public readonly userId: string,
    public readonly token: string, 
    public readonly platform?: Platform,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}
