import express from 'express';
import Match from '../models/match';
import ResultT from '../models/resultT';

export class ResultTController{

    addResultT = (req:express.Request, res:express.Response)=>{
        let resultt = new ResultT(req.body);

        resultt.save().then((resultt)=>{
            res.status(200).json({'message':'Result Added'});
        }).catch((err)=>{
            res.status(400).json({'message':err});
        })
    }

    insertOsmina = (req:express.Request, res:express.Response)=>{
        let resultt = new ResultT(req.body);

        resultt.save().then((resultt)=>{
            res.status(200).json({'message':'Result Added'});
        }).catch((err)=>{
            res.status(400).json({'message':err});
        })
    }

    insertCetvrtina = (req:express.Request, res:express.Response)=>{
        let resultt = new ResultT(req.body);

        resultt.save().then((resultt)=>{
            res.status(200).json({'message':'Result Added'});
        }).catch((err)=>{
            res.status(400).json({'message':err});
        })
    }

    insertPolufinale = (req:express.Request, res:express.Response)=>{
        let resultt = new ResultT(req.body);

        resultt.save().then((resultt)=>{
            res.status(200).json({'message':'Result Added'});
        }).catch((err)=>{
            res.status(400).json({'message':err});
        })
    }

    getResultT = (req:express.Request, res:express.Response)=>{
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let sex = req.body.sex;

        ResultT.findOne({'sport':sport,'discipline':discipline,'sex':sex},(err, matches)=>{
            if(err) console.log(err);
            else   
                res.json(matches);
        })
    }

    insertResultT = (req:express.Request, res:express.Response)=>{
        let name1 = req.body.name1;
        let name2 = req.body.name2;
        let sex = req.body.sex;
        let result = req.body.result;
        let round = req.body.round;

        if(round == 8){
            ResultT.findOneAndUpdate({'sex':sex, 'osmina':{$elemMatch:{'name1':name1, 'name2':name2}}},
             {$set:{'osmina.$.result':result, 'round':4}}, (err, match)=>{
                 if(err) console.log(err);
                 else
                    res.json(match);
             })
        }else if(round==4){
            ResultT.findOneAndUpdate({'sex':sex, 'cetvrtina':{$elemMatch:{'name1':name1, 'name2':name2}}},
             {$set:{'cetvrtina.$.result':result, 'round':2}}, (err, match)=>{
                 if(err) console.log(err);
                 else
                    res.json(match);
             })
        }else if(round==2){
            ResultT.findOneAndUpdate({'sex':sex, 'polufinale':{$elemMatch:{'name1':name1, 'name2':name2}}},
             {$set:{'polufinale.$.result':result, 'round':1}}, (err, match)=>{
                 if(err) console.log(err);
                 else
                    res.json(match);
             })
        }else if(round == 3){
            ResultT.findOneAndUpdate({'sex':sex, 'treceMesto':{$elemMatch:{'name1':name1, 'name2':name2}}},
             {$set:{'treceMesto.$.result':result, 'round':0}}, (err, match)=>{
                 if(err) console.log(err);
                 else
                    res.json(match);
             })
        }else{
            ResultT.findOneAndUpdate({'sex':sex, 'finale':{$elemMatch:{'name1':name1, 'name2':name2}}},
             {$set:{'finale.$.result':result, 'round':0}}, (err, match)=>{
                 if(err) console.log(err);
                 else
                    res.json(match);
             })
        }
    }

    insertMatch = (req:express.Request, res:express.Response)=>{
        let name1 = req.body.name1;
        let name2 = req.body.name2;
        let sex = req.body.sex;
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let round = req.body.round;

        let match = new Match({'name1':name1, 'name2':name2, 'sex':sex, 'sport':sport, 'discipline':discipline,
        'result':null,'date':null, 'time':null, 'location':null});

        if(round==4){
            ResultT.update({'sport':sport, 'discipline':discipline,'sex':sex},{$push:{'cetvrtina':match}}, (err, matchh)=>{
                if(err) console.log(err);
                 else
                    res.json(matchh);
            })
        }else if(round==2){
            ResultT.update({'sport':sport, 'discipline':discipline,'sex':sex},{$push:{'polufinale':match}}, (err, matchh)=>{
                if(err) console.log(err);
                 else
                    res.json(matchh);
            })
        }else if(round==3){
            ResultT.update({'sport':sport, 'discipline':discipline,'sex':sex},{$push:{'treceMesto':match}}, (err, matchh)=>{
                if(err) console.log(err);
                 else
                    res.json(matchh);
            })
        }else if(round==1){
            ResultT.update({'sport':sport, 'discipline':discipline,'sex':sex},{$push:{'finale':match}}, (err, matchh)=>{
                if(err) console.log(err);
                 else
                    res.json(matchh);
            })
        }

    }
}