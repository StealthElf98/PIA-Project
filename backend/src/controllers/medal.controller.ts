import express from 'express';
import Medal from '../models/medal';

export class MedalController{
    getAllMedals = (req:express.Request, res:express.Response)=>{
        Medal.find({}, (err, medals)=>{
            if(err) console.log(err);
            else{
                res.json(medals);
            }
        })
    }

    giveGold = (req:express.Request, res:express.Response)=>{
        let country = req.body.country;
        
        Medal.findOneAndUpdate({'country':country}, {$inc:{'gold':1, 'all':1}}, (err, country)=>{
            if(err) console.log(err);
            else{
                res.json(country);
            }
        })
    }

    giveSilver = (req:express.Request, res:express.Response)=>{
        let country = req.body.country;
        
        Medal.findOneAndUpdate({'country':country}, {$inc:{'silver':1, 'all':1}}, (err, country)=>{
            if(err) console.log(err);
            else{
                res.json(country);
            }
        })
    }

    giveBronze = (req:express.Request, res:express.Response)=>{
        let country = req.body.country;
        
        Medal.findOneAndUpdate({'country':country}, {$inc:{'bronze':1, 'all':1}}, (err, country)=>{
            if(err) console.log(err);
            else{
                res.json(country);
            }
        })
    }
}