import mongoose, { Schema } from "mongoose";
import { UserModel } from "./user.model"; 

export const TeamMemberSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    roleLevel: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: false,
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

TeamMemberSchema.post("findOneAndDelete", async function (doc) {
  if (doc?.userId) {
    await UserModel.findByIdAndUpdate(doc.userId, { $unset: { teamMember: "" } });
  }
});

TeamMemberSchema.post("deleteOne", { document: true, query: false }, async function (doc) {
  if (doc?.userId) {
    await UserModel.findByIdAndUpdate(doc.userId, { $unset: { teamMember: "" } });
  }
});

export const TeamMemberModel = mongoose.model("TeamMember", TeamMemberSchema);
