import { ObjectId } from 'bson';
import express from 'express';
import Sport from '../models/sport';

export class SportController{
    insertSport = (req:express.Request, res:express.Response)=>{
        let sport = new Sport(req.body);

        sport.save().then((sport)=>{
            res.status(200).json({'message':'Sport added'});
        }).catch((err)=>{
            res.status(400).json({'message':err});
        })
    }

    getAllSports = (req:express.Request, res:express.Response)=>{

        Sport.distinct("sport", (err, sports)=>{
            if(err) console.log(err);
            else{
                sports.unshift("All Sports");
                res.json(sports);
            }
        })
    }

    getISports = (req:express.Request, res:express.Response)=>{

        Sport.distinct("sport", {'type':'I'}, (err, sports)=>{
            if(err) console.log(err);
            else{
                sports.unshift("");
                res.json(sports);
            }
        })
    }

    getESports = (req:express.Request, res:express.Response)=>{

        Sport.distinct("sport", {'type':'E'}, (err, sports)=>{
            if(err) console.log(err);
            else{
                sports.unshift("");
                res.json(sports);
            }
        })
    }

    getAllSportss = (req:express.Request, res:express.Response)=>{

        Sport.distinct("sport", (err, sports)=>{
            if(err) console.log(err);
            else{
                sports.unshift("");
                res.json(sports);
            }
        })
    }

    checkIfOk = (req:express.Request, res:express.Response)=>{
        let sport = req.body.sport;
        let discipline = req.body.discipline;

        Sport.findOne({'sport':sport, 'discipline':discipline}, (err, sport)=>{
            if(err) console.log(err);
            else{
                res.json(sport);
            }
        })
    }

    distinctDisciplines = (req:express.Request, res:express.Response)=>{

        Sport.distinct("discipline", (err, disciplines)=>{
            if(err) console.log(err);
            else{
                disciplines.unshift("All Disciplines");
                res.json(disciplines);
            }
        })
    }

    distinctDiscipliness = (req:express.Request, res:express.Response)=>{

        Sport.distinct("discipline", (err, disciplines)=>{
            if(err) console.log(err);
            else{
                res.json(disciplines);
            }
        })
    }

    getSportId = (req:express.Request, res:express.Response)=>{
        let sport = req.body.sport;
        let discipline = req.body.discipline;

        Sport.findOne({'sport':sport, 'discipline':discipline},{_id:1}, (err, sport)=>{
            if(err) console.log(err);
            else{
                console.log(sport);
                res.json(sport);
            }
        })
    }
}