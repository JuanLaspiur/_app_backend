import mongoose, { Schema } from "mongoose";
import { TeamSchema } from "./team.model";

const DepartmentSchema = new Schema(
    {
        name: { type: String, required: true },
        manager: { type: String, required: true },
        location: { type: String, required: true, default:' - '   },
        teams: [TeamSchema],
    },
    {
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
    }
);


export const DepartmentModel = mongoose.model("Department", DepartmentSchema);