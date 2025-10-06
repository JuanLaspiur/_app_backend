import mongoose, {Schema}  from "mongoose";

const NoteSchema = new Schema (
    {
        userId: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
         content: {
            type: String,
            required: true,
            trim: true,
        }
    },
     {
        timestamps: true,
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: (_doc, ret:any) => {
                ret.id = ret._id.toString();
                delete ret ._id;   
            }
            ,
        },
    }
)

export const NoteModel = mongoose.model('Note', NoteSchema);