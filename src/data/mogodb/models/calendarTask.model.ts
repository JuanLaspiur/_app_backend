import mongoose, { Schema } from "mongoose";

const CalendarTaskSchema = new Schema(
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
        date:{
            type:String,
            require: true    
        },
        startTime:{
            type:String
        },
        endTime:{
            type:String
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
    });

    export const CalendarTaskModel = mongoose.model('Calendar_Task',CalendarTaskSchema)
