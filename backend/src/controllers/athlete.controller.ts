import express, { json } from 'express';
import Medal from '../models/medal';
import Athlete from '../models/athlete';
import AthleteT from '../models/athleteT';

export class AthleteController{

    addAthlete = (req:express.Request, res:express.Response) => {
        let sport = req.body.sport;

        if(sport == "Tenis"){
            let athletet = new AthleteT(req.body);

            athletet.save().then((athletet)=>{
                res.status(200).json({'message':'Athlete added'});
            }).catch((err)=>{
                res.status(400).json({'message':err});
            })
        }else{
            let athlete = new Athlete(req.body);

            athlete.save().then((athlete)=>{
                res.status(200).json({'message':'Athlete added'});
            }).catch((err)=>{
                res.status(400).json({'message':err});
            })
        }
    }

    alreadyExists = (req:express.Request, res:express.Response) =>{
        let name = req.body.name;
        let discipline = req.body.discipline;

        Athlete.findOne({'name':name, 'discipline':discipline}, (err, athlete)=>{
            if(err) console.log(err);
            else{
                res.json(athlete);
            }
        })

    }

    sameSport = (req:express.Request, res:express.Response) =>{
        let name = req.body.name;
        let sport = req.body.sport;

        Athlete.findOne({'name':name, 'sport':{$ne: sport}}, (err, athlete)=>{
            if(err) console.log(err);
            else{
                res.json(athlete);
            }
        })
    }

    getAllAthletesByParam = (req:express.Request, res:express.Response) =>{
        let name = req.body.name;
        let sex = req.body.sex;
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let country = req.body.country;
        let wonM = req.body.wonM;
        let uslov=[];

        if((name !== undefined) && (name!='')){uslov.push({'name':{$regex: name}});}
        if(sex !== undefined){uslov.push({'sex':sex});}
        if((sport !== undefined) && (sport !=='All Sports')){uslov.push({'sport':sport});}
        if((discipline !== undefined)&&(discipline !=='All Disciplines')){uslov.push({'discipline':discipline});}
        if((country!==undefined) && (country != "All Coutries")){uslov.push({'country':country});}
        if(wonM !=undefined) {uslov.push({'wonM':wonM});}  
        
        if(uslov.length != 0){
            Athlete.find({$and:uslov}, (err, athlete)=>{
                if(err) console.log(err);
                else{
                    res.json(athlete);
                }
            })
        }else{
            Athlete.find({}, (err, athlete)=>{
                if(err) console.log(err);
                else{
                    res.json(athlete);
                }
            })
        }
    }


    enoughAthletes = (req:express.Request, res:express.Response) =>{
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let sex = req.body.sex;

        Athlete.find({'sport':sport, 'discipline':discipline, 'sex':sex}, (err, athletes)=>{
            if(err) console.log(err);
            else{
                res.json(athletes);
            }
        })
    }

    giveMedals = (req:express.Request, res:express.Response) =>{
        let names = req.body.names;
        let discipline = req.body.discipline;
        let niz = [];

        niz.push({'name':names[0], 'discipline':discipline});
        niz.push({'name':names[1], 'discipline':discipline});
        niz.push({'name':names[2], 'discipline':discipline});

        Athlete.updateMany({$or:niz}, {$set:{'wonM':1}}, (err, arr)=>{
            if(err) console.log(err);
            else{
                console.log(arr);
                res.json(arr);
            }
        })

    }

    giveGold = (req:express.Request, res:express.Response) =>{
        let name = req.body.name;
        let discipline = req.body.discipline;

        Athlete.findOneAndUpdate({'name':name, 'discipline':discipline},{$set:{'wonM':1, 'medal':"Z"}}, (err, athlete)=>{
            if(err) console.log(err);
            else{
                res.json(athlete);
            }
        });

    }

    giveSilver = (req:express.Request, res:express.Response) =>{
        let name = req.body.name;
        let discipline = req.body.discipline;

        var s = Athlete.findOneAndUpdate({'name':name, 'discipline':discipline},{$set:{'wonM':1, 'medal':"S"}}, (err, athlete)=>{
            if(err) console.log(err);
            else{
                res.json(athlete);
            }
        });
    }

    giveBronze = (req:express.Request, res:express.Response) =>{
        let name = req.body.name;
        let discipline = req.body.discipline;

        var s = Athlete.findOneAndUpdate({'name':name, 'discipline':discipline},{$set:{'wonM':1, 'medal':"B"}}, (err, athlete)=>{
            if(err) console.log(err);
            else{
                res.json(athlete);
            }
        });
        
    }

    getAthletesByDiscipline = (req:express.Request, res:express.Response) =>{
        let discipline = req.body.discipline;
        let sex = req.body.sex;

        Athlete.find({'discipline':discipline, 'sex':sex}, (err, athletes)=>{
            if(err) console.log(err);
            else{
                res.json(athletes);
            }
        })
    }

    getTenisPlayers = (req:express.Request, res:express.Response) =>{
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let sex = req.body.sex;

        Athlete.find({"sport":sport, "discipline":discipline, "sex":sex}, (err, ath)=>{
            if(err) console.log(err);
            else{
                res.json(ath);
            }
        })
    }

    getAthlete = (req:express.Request, res:express.Response) =>{
        let name = req.body.name;
        let discipline = req.body.discipline;

        Athlete.findOne({'name':name, 'discipline':discipline}, (err, ath)=>{
            if(err) console.log(err);
            else{
                res.json(ath);
            }
        })
    }

    doubleExists = (req:express.Request, res:express.Response) =>{
        let name = req.body.name;
        Athlete.findOne({'name':name}, (err, ath)=>{
            if(err) console.log(err);
            else{
                res.json(ath);
            }
        })
    }

    getDoubles = (req:express.Request, res:express.Response) =>{
        let discipline = req.body.discipline;
        let sex = req.body.sex;

        Athlete.find({'name':{$regex:'/'}, 'discipline':discipline, 'sex':sex}, (err, aths)=>{
            if(err) console.log(err);
            else{
                res.json(aths);
            }
        })
    }

    getAllAthletesFromCountry = (req:express.Request, res:express.Response) => {
        let country = req.body.country;

        Athlete.find({'country':country}, (err, aths)=>{
            if(err) console.log(err);
            else{
                res.json(aths);
            }
        })
    }

    getAllDisciplinesFromCountry = (req:express.Request, res:express.Response) => {
        let country = req.body.country;
        let sport = req.body.sport;

        Athlete.distinct('discipline', {'country':country, 'sport':sport}, (err, dis)=>{
            if(err) console.log(err);
            else{
                res.json(dis);
            }
        })

    }

    getAllAthletesByDiscipline = (req:express.Request, res:express.Response) =>{
        let country = req.body.country;
        let discipline = req.body.discipline;

        Athlete.find({'country':country, 'discipline':discipline}, (err, ath)=>{
            if(err) console.log(err);
            else{
                res.json(ath);
            }
        })
    }

    getAllAthletesBySport = (req:express.Request, res:express.Response) =>{
        let country = req.body.country;
        let sport = req.body.sport;

        Athlete.find({'country':country, 'sport':sport}, (err, ath)=>{
            if(err) console.log(err);
            else{
                res.json(ath);
            }
        })
    }
}

export default AthleteController;