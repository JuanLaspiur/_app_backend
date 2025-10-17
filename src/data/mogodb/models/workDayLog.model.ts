import mongoose, { Schema } from "mongoose";

export enum WorkDayStatus {
  PENDING = "pending",
  OFF = "off",
  HOLIDAY = "holiday",
  ATTENDED = "attended",
  LATE = "late",
  ABSENT = "absent",  
}




const WorkDayLogSchema = new Schema(
  {
    userId: { type: String, required: true },
    scheduleId: { type: String, required: true },
    checkIn: { type: Date },
    checkOut: { type: Date },
    status: {
       type: String,
       enum: Object.values(WorkDayStatus),
        default: WorkDayStatus.OFF 

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

export const WorkDayLogModel = mongoose.model("Work_Day_Log", WorkDayLogSchema);


