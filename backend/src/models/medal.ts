import mongoose, { model } from 'mongoose';

const Schema = mongoose.Schema;

let Medal = new Schema(
    {
        country:{
            type:String
        },
        gold:{
            type:Number
        },
        silver:{
            type:Number
        },
        bronze:{
            type:Number
        },
        all:{
            type:Number
        }
    }
)

export default mongoose.model('Medal', Medal, 'Medals');