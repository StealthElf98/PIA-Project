import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Team = new Schema(
    {
        country:{
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
        athletes:{
            type:Array
        },
        wonM:{
            type:Number
        },
        medal:{
            type:String
        }
        
    }
)

export default mongoose.model('Team', Team, 'Teams');