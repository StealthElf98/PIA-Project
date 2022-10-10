import express from 'express';
import Team from '../models/team';

export class TeamController{
    addTeam = (req:express.Request, res:express.Response) =>{
        let team = new Team(req.body);

        team.save().then((team)=>{
            res.status(200).json({'message':'Team added'});
        }).catch((err)=>{
            res.status(400).json({'message':err});
        })
    }

    teamExists = (req:express.Request, res:express.Response) =>{
        let country = req.body.country;
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let sex = req.body.sex;

        Team.findOne({'country':country, 'sport':sport, 'discipline':discipline, 'sex':sex}, (err, team)=>{
            if(err) console.log(err);
            else{
                res.json(team);
            }
        })
    }

    getTeams = (req:express.Request, res:express.Response) =>{
        let sport = req.body.sport;
        let sex = req.body.sex;


        Team.find({'sport':sport, 'sex':sex}, (err, team)=>{
            if(err) console.log(err);
            else{
                res.json(team);
            }
        })
    }

    getITeams  = (req:express.Request, res:express.Response) =>{
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let sex = req.body.sex;


        Team.find({'sport':sport,'discipline':discipline, 'sex':sex}, (err, team)=>{
            if(err) console.log(err);
            else{
                res.json(team);
            }
        })
    }
}

export default TeamController;