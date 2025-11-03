import mongoose, { Schema } from "mongoose";

// Enum exportable de estados de proyecto
export const ProyectStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  ARCHIVED: "ARCHIVED",
} as const;
export type ProyectStatusType = typeof ProyectStatus[keyof typeof ProyectStatus];

// Enum exportable de prioridad
export const ProyectPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;
export type ProyectPriorityType = typeof ProyectPriority[keyof typeof ProyectPriority];

export const ProyectSchema = new Schema(
  {
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: Object.values(ProyectStatus),
      default: ProyectStatus.PENDING,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    estimatedDeliveryDate: {
      type: Date, 
      default: null,
    },
    endDate: {
      type: Date, 
    },
    priority: {
      type: String,
      enum: Object.values(ProyectPriority),
      default: ProyectPriority.MEDIUM,
    },
    budget: {
      type: Number, 
      default: null,
    },
    tags: [
      {
        type: String,
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

export const ProyectModel = mongoose.model("Proyect", ProyectSchema);
