import { PushNotificationRepository, PushNotificationEntity, PushNotificationDatasource } from "../../domain";
import { jwtDto, SaveTokenDto, SendNotificationDto } from "../../domain/dtos";

export class PushNotificationRepositoryImpl implements PushNotificationRepository {

    constructor(private readonly datasource: PushNotificationDatasource) { }


    saveToken(dto: jwtDto, saveTokenDto: SaveTokenDto): Promise<PushNotificationEntity> {
        return this.datasource.saveToken(dto, saveTokenDto);
    }
    getTokensByUser(dto: jwtDto): Promise<PushNotificationEntity> {
        return this.datasource.getTokensByUser(dto);
    }
    sendNotification(sendNotificationDto: SendNotificationDto): Promise<void> {
        return this.datasource.sendNotification(sendNotificationDto);
    }



}