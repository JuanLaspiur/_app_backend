import mongoose, { Query, Schema } from 'mongoose';
import { TeamMemberModel } from './teamMember';

const SessionSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'firstName is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'lastName is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'moderator'],
      default: 'user',
    },
    username: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
    },
    session: SessionSchema,
    jobTitle: {
      type: String,
    },
    location: {
      type: String,
    },
    teamMember: {
      type: Schema.Types.ObjectId,
      ref: 'TeamMember',
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.set('toJSON', {
  transform: (_, ret) => {
    const r = ret as any;
    r.id = r._id.toString();
    delete r._id;
    delete r.password;
    return r;
  },
});

function autoPopulateTeamMember(this: Query<any, any>, next: () => void) {
  const opts = (this as any).getOptions?.() as Record<string, any> | undefined;
  if (opts && opts.autopopulate === false) {
    return next();
  }
  this.populate({
    path: 'teamMember',
    select: '-userId',
  });

  next();
}

async function deleteAssociatedTeamMember(doc: any) {
  if (doc?.teamMember) {
    await TeamMemberModel.findByIdAndDelete(doc.teamMember);
  }
}
UserSchema.pre("find", autoPopulateTeamMember);
UserSchema.pre("findOne", autoPopulateTeamMember);
UserSchema.post("findOneAndDelete", deleteAssociatedTeamMember);
UserSchema.post("deleteOne", { document: true, query: false }, deleteAssociatedTeamMember);

export const UserModel = mongoose.model('User', UserSchema);
