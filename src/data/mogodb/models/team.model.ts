import mongoose, { Schema } from "mongoose";

export const TeamSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }], // quisiera que siempre se devuelva el User entero
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

export const TeamModel = mongoose.model("Team", TeamSchema);