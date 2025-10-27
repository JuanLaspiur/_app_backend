import mongoose, { Schema } from "mongoose";
import { UserModel } from "./user.model"; 

export const PaymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ["Credit Card", "PayPal", "Bank Transfer", "Cash"],
    default: "Credit Card",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Paid", "Pending", "Failed"],
    default: "Pending",
  },
  description: {
    type: String,
  },
}, {
  timestamps: false,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
    },
  },
});

PaymentSchema.post("save", async function (doc) {
  await doc.populate({
    path: "userId",
    select: "-session -teamMember" 
  });
});


PaymentSchema.post("findOneAndDelete", async function (doc) {
  if (doc?.userId) {
    await UserModel.findByIdAndUpdate(doc.userId, { $unset: { teamMember: "" } });
  }
});

PaymentSchema.post("deleteOne", { document: true, query: false }, async function (doc) {
  if (doc?.userId) {
    await UserModel.findByIdAndUpdate(doc.userId, { $unset: { teamMember: "" } });
  }
});

export const PaymentModel = mongoose.model("Payment", PaymentSchema);
