import jwt from "jsonwebtoken";
import { PushNotificationModel } from "../../data/mogodb";
import { PushNotificationDatasource, PushNotificationEntity } from "../../domain";
import { jwtDto, SaveTokenDto, SendNotificationDto } from "../../domain/dtos";
import { PushNotificationMapper } from "../index";

export class PushNotificationDataSourceImpl implements PushNotificationDatasource {

    async saveToken(dto: jwtDto, saveTokenDto: SaveTokenDto): Promise<PushNotificationEntity> {
        let payload: any;

        try {
            payload = jwt.verify(dto.token!, process.env.JWT_SECRET!);
        } catch {
            throw new Error("Invalid or expired token");
        }

        const userId = payload.id || payload.userId;
        if (!userId) {
            throw new Error("Invalid token payload: missing user id");
        }

        const { token, platform } = saveTokenDto;

        const existing = await PushNotificationModel.findOne({ userId, token });

        if (existing) {
            return PushNotificationMapper.toEntity(existing);
        }

        const created = await PushNotificationModel.create({
            userId,
            token,
            platform,
        });

        return PushNotificationMapper.toEntity(created);
    }
    async getTokensByUser(dto: jwtDto): Promise<PushNotificationEntity> {
        let payload: any;

        try {
            payload = jwt.verify(dto.token!, process.env.JWT_SECRET!);
        } catch {
            throw new Error("Invalid or expired token");
        }

        const userId = payload.id || payload.userId;
        if (!userId) throw new Error("Invalid token payload: missing user id");

        const tokenDoc = await PushNotificationModel.findOne({ userId })
            .sort({ updatedAt: -1 });
        if (!tokenDoc) {
            throw new Error("No push token found for this user");
        }

        return PushNotificationMapper.toEntity(tokenDoc);

    }



    sendNotification(sendNotificationDto: SendNotificationDto): Promise<void> {
        throw new Error("Method not implemented.");
    }



}

