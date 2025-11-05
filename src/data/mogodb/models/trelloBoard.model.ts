import mongoose, { Schema } from "mongoose";
import { TeamModel } from "./team.model";


export const TrelloBoardSchema = new Schema(
  {
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
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
export const TrelloBoardModel = mongoose.model("TrelloBoard", TrelloBoardSchema);