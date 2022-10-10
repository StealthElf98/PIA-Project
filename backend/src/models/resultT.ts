import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ResultT = new Schema(
    {
        sport:{
            type:String
        },
        discipline:{
            type:String
        },
        sex:{
            type:String
        },
        osmina:{
            type:Array
        },
        cetvrtina:{
            type:Array
        },
        polufinale:{
            type:Array
        },
        treceMesto:{
            type:Array
        },
        finale:{
            type:Array
        },
        round:{
            type:Number
        },
        delegat:{
            type:String
        }
    }
)

export default mongoose.model('ResultT', ResultT, "ResultTs");