import mongoose from 'mongoose';
import Athlete from './athlete';

const Schema = mongoose.Schema;

let Result = new Schema(
    {
        delegat:{
            type:String
        },
        sport:{
            type:String
        },
        discipline:{
            type:String
        },
        sex:{
            type:String
        },
        date:{
            type:String
        },
        time:{
            type:String
        },
        location:{
            type:String
        },
        athlete:{
            type:String
        },
        result1:{
            type:String
        },
        result2:{
            type:String
        },
        result3:{
            type:String
        },
        result4:{
            type:String
        },
        result5:{
            type:String
        },
        result6:{
            type:String
        },
    }
)

export default mongoose.model("Result", Result, "Results");