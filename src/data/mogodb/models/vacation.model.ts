// backend/models/Vacation.ts
import mongoose, { Schema } from 'mongoose';

export type VacationStatus = 'pendiente' | 'aprobada' | 'rechazada';

const VacationSchema = new Schema(
  {
    userId: {
      type: Number,
      required: [true, 'userId is required'],
    },
    totalDays: {
      type: Number,
      required: [true, 'totalDays is required'],
    },
    usedDays: {
      type: Number,
      required: [true, 'usedDays is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'startDate is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'endDate is required'],
    },
    status: {
      type: String,
      enum: ['pendiente', 'aprobada', 'rechazada'],
      default: 'pendiente',
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt
    versionKey: false,
  }
);

VacationSchema.set('toJSON', {
  transform: (_, ret) => {
    const r = ret as any;
    r.id = r._id.toString();
    delete r._id;
    return r;
  },
});


export const VacationModel = mongoose.model('Vacation', VacationSchema);
