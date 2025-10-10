import mongoose, { Schema } from 'mongoose';

const PushNotificationSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        token: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
          platform: {
            type: String,
            enum: ["android", "ios", "web"],
            required: true,
            default: "android",
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: (_doc, ret:any) => {
                ret.id = ret._id.toString();
                delete ret ._id;   
            }
            ,
        },
    }
);

export const PushNotificationModel = mongoose.model('PushNotification', PushNotificationSchema);
