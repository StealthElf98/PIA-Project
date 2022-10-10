import express from 'express';
import Tournament from '../models/tournament';

export class TournamentController{

    getStartDate = (req:express.Request, res:express.Response)=>{
        let discipline = req.body.discipline;
        let sex = req.body.sex;

        Tournament.findOne({'discipline':discipline, 'sex':sex}, (err, start)=>{
            if(err) console.log(err);
            else{
                res.json(start);
            }
        })
    }

    disciplineExists = (req:express.Request, res:express.Response)=>{
        let discipline = req.body.discipline;
        let sex = req.body.sex;

        Tournament.findOne({'discipline':discipline, 'sex':sex}, (err, tournament)=>{
            if(err) console.log(err);
            else{
                res.json(tournament);
            }
        })
    }

    insertTournament = (req:express.Request, res:express.Response)=>{
        let tournament = new Tournament(req.body);

        tournament.save().then((tournament)=>{
            res.status(200).json({'message':'Tournament added'});
        }).catch((err)=>{
            res.status(400).json({'message':err});
        })
    }

    getTournaments = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;

        Tournament.find({'delegat':username}, (err, tournaments)=>{
            if(err) console.log(err);
            else{
                res.json(tournaments);
            }
        })
    }

    sportExists = (req:express.Request, res:express.Response)=>{
        let sport = req.body.sport;
        let discipline = req.body.discipline 
        let sex = req.body.sex;


        if(sport == "Tenis"){
            Tournament.findOne({'sport':sport,'discipline':discipline, 'sex':sex}, (err, tournament)=>{
                if(err) console.log(err);
                else{
                    res.json(tournament);
                }
            })
        }else{
            Tournament.findOne({'sport':sport,'sex':sex}, (err, tournament)=>{
                if(err) console.log(err);
                else{
                    res.json(tournament);
                }
            })
        }
        
    }

    checkNumOfTour= (req:express.Request, res:express.Response)=>{
        let delegat = req.body.delegat;

        Tournament.find({'delegat':delegat},(err, del)=>{
            if(err) console.log(err);
            else{
                res.json(del);
            }
        })
    }
}