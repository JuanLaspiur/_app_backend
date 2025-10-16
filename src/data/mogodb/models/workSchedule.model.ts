import mongoose, { Schema } from "mongoose";
import { WorkDayLogModel } from "./workDayLog.model";
import { createMissingSchedulesAndLogs } from "../helpers/workSchedule.helper";

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
        isWorkday: {
            type: Boolean,
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

WorkScheduleSchema.post("save", async function (doc) {
    await createMissingSchedulesAndLogs(doc.userId, doc._id.toString(), doc.isWorkday);
});

WorkScheduleSchema.post("findOneAndUpdate", async function (doc) {
    await createMissingSchedulesAndLogs(doc.userId, doc._id.toString(), doc.isWorkday);
});

WorkScheduleSchema.post("findOneAndDelete", async function (doc: any) {
    if (doc) {
        await WorkDayLogModel.deleteMany({ scheduleId: doc._id.toString() });
    }
});



export const WorkScheduleModel = mongoose.model('Work_Schedule', WorkScheduleSchema);
