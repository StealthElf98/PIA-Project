import express from 'express';
import Record from '../models/record';

export class RecordController{

    getAllMRecords = (req:express.Request, res:express.Response)=>{
        Record.find({'sex':'M'}, (err, records)=>{
            if(err) console.log(err);
            else{
                res.json(records);
            }
        })
    }

    getAllFRecords = (req:express.Request, res:express.Response)=>{
        Record.find({'sex':'Z'}, (err, records)=>{
            if(err) console.log(err);
            else{
                res.json(records);
            }
        })
    }
}