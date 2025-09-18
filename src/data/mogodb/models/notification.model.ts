import mongoose, { Schema } from 'mongoose';

const NotificationSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            enum: ["info", "warning", "success", "error"],
            required: true,
            default: "info",
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

export const NotificationModel = mongoose.model('Notification', NotificationSchema);
