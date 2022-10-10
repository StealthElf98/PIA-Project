import { Decimal128 } from 'bson';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Record = new Schema(
    {
        sex:{
            type:String
        },
        discipline:{
            type:String
        },
        result:{
            type:String
        },
        athlete:{
            type:String
        },
        country:{
            type:String
        },
        place:{
            type:String
        },
        year:{
            type:Number
        }
    }
)

export default mongoose.model('Record', Record, 'Records');

