import mongoose, { Schema } from "mongoose";

export const DaysOfWeekArray = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
] as const;

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
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        isWorkday:{
            type:Boolean,
            default: false 
        }
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
