import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Match = new Schema(
    {
        name1:{
            type:String
        },
        name2:{
            type:String
        },
        sex:{
            type:String
        },
        sport:{
            type:String
        },
        discipline:{
            type:String
        },
        date:{
            type:Array
        },
        time:{
            type:Array
        },
        location:{
            type:Array
        },
        result:{
            type:String
        }
    }
)

export default mongoose.model('Match', Match);