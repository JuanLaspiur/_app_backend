import mongoose, { Schema } from "mongoose";

export const TeamSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: String }],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_doc, ret: any) => {
            ret.id = ret._id.toString();
            delete ret._id;
        }
        ,
    },
});

export const Department = mongoose.model("Team", TeamSchema);