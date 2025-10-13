import mongoose, { Schema } from "mongoose";

// Array de días
export const DaysOfWeekArray = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
] as const;

// TypeScript type basado en el array
export type DaysOfWeekType = (typeof DaysOfWeekArray)[number];

const WorkScheduleSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        day: {
            type: String,
            enum: DaysOfWeekArray,
            required: true,
        },
        startTime: {
            type: String,
        },
        endTime: {
            type: String,
        },
        notification: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: (_doc, ret: any) => {
                ret.id = ret._id.toString();
                delete ret._id;
            },
        },
    }
);

export const WorkScheduleModel = mongoose.model('Work_Schedule', WorkScheduleSchema);
