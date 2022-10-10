import express from 'express';
import Result from '../models/result';

export class ResultController{
    addResult = (req:express.Request, res:express.Response)=>{
        let result = new Result(req.body);

        result.save().then((result)=>{
            res.status(200).json({'message':'Result Added'});
        }).catch((err)=>{
            res.status(400).json({'message':err});
        })
    }

    checkIfOk = (req:express.Request, res:express.Response)=>{
        let date = req.body.date;
        let time = req.body.time;
        let location = req.body.location;
        let discipline = req.body.discipline;

        Result.findOne({'date':date, 'time':time, 'location':location, 'discipline':{$ne:discipline}}, (err, result)=>{
            if(err) console.log(err);
            else{
                res.json(result);
            }
        })
    }

    setTimeAndLocation = (req:express.Request, res:express.Response)=>{
        let time = req.body.time;
        let location = req.body.location;
        let discipline = req.body.discipline;
        let sex = req.body.sex;

        console.log(location + " " + time);

        Result.updateMany({'discipline':discipline, 'sex':sex}, {$set: {'time':time, 'location':location}}, (err, response)=>{
            if(err) console.log(err);
            else{
                res.json(response);
            }
        })
    }

    insertResults = (req:express.Request, res:express.Response)=>{
        let athlete = req.body.athlete;
        let discipline = req.body.discipline;
        let result1 = req.body.result1;
        let round = req.body.round;

        if(round == 1){
            Result.findOneAndUpdate({'athlete':athlete, 'discipline':discipline}, {$set:{'result1':result1}}, (err, response)=>{
                if(err) 
                    console.log(err);
                else{
                    res.json(response);
                }
            })
        }else if(round == 2){
            Result.findOneAndUpdate({'athlete':athlete, 'discipline':discipline}, {$set:{'result2':result1}}, (err, response)=>{
                if(err) 
                    console.log(err);
                else{
                    res.json(response);
                }
            })
        }else if(round == 3){
            Result.findOneAndUpdate({'athlete':athlete, 'discipline':discipline}, {$set:{'result3':result1}}, (err, response)=>{
                if(err) 
                    console.log(err);
                else{
                    res.json(response);
                }
            })
        }
        else if(round == 4){
            Result.findOneAndUpdate({'athlete':athlete, 'discipline':discipline}, {$set:{'result4':result1}}, (err, response)=>{
                if(err) 
                    console.log(err);
                else{
                    res.json(response);
                }
            })
        }else if(round == 5){
            Result.findOneAndUpdate({'athlete':athlete, 'discipline':discipline}, {$set:{'result5':result1}}, (err, response)=>{
                if(err) 
                    console.log(err);
                else{
                    res.json(response);
                }
            })
        }
        else if(round == 6){
            Result.findOneAndUpdate({'athlete':athlete, 'discipline':discipline}, {$set:{'result6':result1}}, (err, response)=>{
                if(err) 
                    console.log(err);
                else{
                    res.json(response);
                }
            })
        }

        
    }
    
    getFirstResult = (req:express.Request, res:express.Response)=>{
        let discipline = req.body.discipline;
        let sex = req.body.sex;

        Result.findOne({'discipline':discipline, 'sex':sex}, (err,result )=>{
        if(err) {console.log(err);}
        else{
            res.json(result);
        }
        })
    }

    getOneResult = (req:express.Request, res:express.Response)=>{
        let discipline = req.body.discipline;
        let sex = req.body.sex;

        Result.findOne({'discipline':discipline, 'sex':sex, 'result':{$ne:null}}, (err,result )=>{
            if(err) 
            console.log(err);
        else{
            res.json(result);
        }
        })
    }

    getAllResults = (req:express.Request, res:express.Response)=>{
        let discipline = req.body.discipline;
        let sex = req.body.sex;

        Result.find({'discipline':discipline, 'sex':sex}, (err,result )=>{
            if(err) 
            console.log(err);
        else{
            res.json(result);
        }
        })
    }
}