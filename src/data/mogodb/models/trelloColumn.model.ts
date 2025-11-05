import mongoose, { Schema } from "mongoose";

export enum TrelloColumnTitle {
  TODO = "To Do",
  INPROGRESS = "In Progress",
  DONE = "Done",
}

export const TrelloColumnSchema = new Schema(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "TrelloBoard",
      required: true,
    },
    title: {
      type: String,
      enum: Object.values(TrelloColumnTitle),
      required: true,
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

export const TrelloColumnModel = mongoose.model("TrelloColumn", TrelloColumnSchema);
