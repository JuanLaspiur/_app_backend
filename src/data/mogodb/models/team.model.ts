import mongoose, { Query, Schema } from "mongoose";

export const TeamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
    },
  },
});

function autoPopulateMembers(this: Query<any, any>, next: () => void) {
  this.populate({
    path: "members",
    select: "-password -session",
  });
  next();
}

TeamSchema.pre("find", autoPopulateMembers);
TeamSchema.pre("findOne", autoPopulateMembers);

export const TeamModel = mongoose.model("Team", TeamSchema);
