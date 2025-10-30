import { CustomError, PushNotificationDatasource, PushNotificationEntity } from "../../domain";
import { jwtDto, SaveTokenDto, SendNotificationDto } from "../../domain/dtos";
import { PushNotificationMapper } from "../index";
import * as PushNotificationUseCases from "../../domain/use-cases/push-notification";

export class PushNotificationDataSourceImpl implements PushNotificationDatasource {

  
  constructor(
    private readonly verifyToken: (dto: jwtDto) => string,
    private readonly handleError: (error: unknown) => never
  ) { }


  private authorize(dto: jwtDto) {
    const userId = this.verifyToken(dto);
    if (!userId) throw CustomError.unauthorized("unauthorized: invalid token");
    return userId;
  }




  async saveToken(dto: jwtDto, saveTokenDto: SaveTokenDto): Promise<PushNotificationEntity> {
    try {
      const userId = this.authorize(dto);
      const tokenDoc = await PushNotificationUseCases.SaveToken.execute(userId, saveTokenDto);
      return PushNotificationMapper.toEntity(tokenDoc);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTokensByUser(dto: jwtDto): Promise<PushNotificationEntity> {
    try {
      const userId = this.authorize(dto);
      const tokenDoc = await PushNotificationUseCases.GetTokensByUserId.execute(userId);
      return PushNotificationMapper.toEntity(tokenDoc);
    } catch (error) {
      this.handleError(error);
    }
  }

  async sendNotification(sendNotificationDto: SendNotificationDto): Promise<void> {
    try {
      await PushNotificationUseCases.SendNotification.execute(sendNotificationDto);
    } catch (error) {
      this.handleError(error);
    }
  }
}
