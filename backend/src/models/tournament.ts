import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Tournament = new Schema(
    {
        sport:{
            type:String
        },
        discipline:{
            type:String
        },
        format:{
            type:String
        },
        sex:{
            type:String
        },
        start:{
            type:String
        },
        end:{
            type:String
        },
        locations:{
            type:Array
        },
        athletes:{
            type:Array
        },
        delegat:{
            type:String
        }
    }
)

export default mongoose.model('Tournament', Tournament, 'Tournaments');