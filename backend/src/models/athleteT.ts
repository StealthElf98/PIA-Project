import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let AthleteT = new Schema(
    {
        name:{
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
        country:{
            type:String
        },
        wonM:{
            type:Number
        },
        medal:{
            type:String
        },
        rank:{
            type:Number
        }
        
    }
)

export default mongoose.model('AthleteT', AthleteT, 'Athletes');