import mongoose, { Schema } from "mongoose";

export enum TrelloTaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical",
}

export const TrelloTaskSchema = new Schema(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "TrelloBoard",
      required: true,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: "TrelloColumn",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    assignees: [
      {
        type: Schema.Types.ObjectId,
        ref: "TeamMember",
      },
    ],
    labels: [{ type: String }],
    priority: {
      type: String,
      enum: Object.values(TrelloTaskPriority),
      default: TrelloTaskPriority.MEDIUM,
    },
    dueDate: { type: Date },
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

export const TrelloTaskModel = mongoose.model("TrelloTask", TrelloTaskSchema);
