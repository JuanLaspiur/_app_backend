import mongoose, { Schema, Query } from "mongoose";

const DepartmentSchema = new Schema(
  {
    name: { type: String, required: true },
    manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String, required: true, default: " - " },
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
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

function autoPopulate(this: Query<any, any>, next: () => void) {
  this.populate({
    path: "manager",
    select: "-password -session",
  }).populate({
    path: "teams",
    populate: [
      {
        path: "members",
        select: "-password -session",
        populate: {
          path: "userId",
          select: "firstName lastName email avatarUrl phone",
        },
      },
      {
        path: "projects",
      },
    ],
  });
  next();
}

DepartmentSchema.pre("find", autoPopulate);
DepartmentSchema.pre("findOne", autoPopulate);

export const DepartmentModel = mongoose.model("Department", DepartmentSchema);
