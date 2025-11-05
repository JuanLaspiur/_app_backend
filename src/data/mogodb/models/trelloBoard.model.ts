import mongoose, { Schema } from "mongoose";

export enum TrelloColumnTitle {
  TODO = "To Do",
  INPROGRESS = "In Progress",
  DONE = "Done",
}

export const TrelloBoardSchema = new Schema(
  {   
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    columns: {
      type: [
        {
          title: {
            type: String,
            enum: Object.values(TrelloColumnTitle),
            required: true,
          },
        },
      ],
      default: Object.values(TrelloColumnTitle).map((title) => ({ title })),
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

export const TrelloBoardModel = mongoose.model("TrelloBoard", TrelloBoardSchema);
