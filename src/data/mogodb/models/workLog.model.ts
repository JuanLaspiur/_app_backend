import mongoose, { Schema } from "mongoose";

const WorkLogSchema = new Schema(
  {
    userId: { type: String, required: true },
    scheduleId: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date },
    notes: { type: String },
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

export const WorkLogModel = mongoose.model("Work_Log", WorkLogSchema);
