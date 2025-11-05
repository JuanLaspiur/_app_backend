import mongoose, { Query, Schema } from "mongoose";

export const TeamSchema = new Schema(
  {
    name: { type: String, required: true },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "TeamMember",
      },
    ],
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Proyect",
        required: false,
      },
    ],
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

function autoPopulateMembers(this: Query<any, any>, next: () => void) {
  this.populate({
    path: "members",
    select: "-__v",
    populate: {
      path: "userId",
      select: "firstName lastName email avatarUrl phone",
      options: { autopopulate: false },
    },
  });
  this.populate({
    path: "projects",
    select: "-__v",
    populate: {
      path: "trelloBoardId",
      options: { autopopulate: false },
    }
  });
  next();
}



TeamSchema.pre("find", autoPopulateMembers);
TeamSchema.pre("findOne", autoPopulateMembers);

export const TeamModel = mongoose.model("Team", TeamSchema);
