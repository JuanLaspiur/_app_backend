import mongoose, { Query, Schema } from "mongoose";

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
      required: false,
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
/*
function autoPopulateRefs(this: Query<any, any>, next: () => void) {
  this.populate({
    path: "userId",
    select: "-password -session",
  });
  next();
}

TeamMemberSchema.pre("find", autoPopulateRefs);
TeamMemberSchema.pre("findOne", autoPopulateRefs);
*/
export const TeamMemberModel = mongoose.model("TeamMember", TeamMemberSchema);
