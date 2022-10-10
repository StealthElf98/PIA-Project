import mogooose from 'mongoose';

const Schema = mogooose.Schema;

let Group = new Schema(
    {
        groupA:{
            type:Array
        },
        groupB:{
            type:Array
        },
        sex:{
            type:String
        },
        sport:{
            type:String
        }
    }
)

export default mogooose.model('Group', Group, 'Groups');