import mongoose, { Schema } from "mongoose";

const WorkWeekLogSchema = new Schema(
  {
 
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

export const WorkWeekLogModel = mongoose.model("Work_Week_Log", WorkWeekLogSchema);
// debe incluir los 7 dias de la semana
/*
import mongoose, { Schema } from "mongoose";

const WorkDayLogSchema = new Schema(
  {
    userId: { type: String, required: true },
    scheduleId: { type: String, required: true },
    checkIn: { type: Date },
    checkOut: { type: Date },
    status: { type: String },
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

export const WorkDayLogModel = mongoose.model("Work_Day_Log", WorkDayLogSchema);



*/