import mogooose from 'mongoose';

const Schema = mogooose.Schema;

let Country = new Schema(
    {
        name:{
            type:String
        },
        numberOfParticipants:{
            type:Number
        }
    }
)

export default mogooose.model('Country', Country, 'Countries');