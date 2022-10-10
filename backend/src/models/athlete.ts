import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Athlete = new Schema(
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
        }
        
    }
)

export default mongoose.model('Athlete', Athlete, 'Athletes');