import express from 'express';
import Group from '../models/group';
import User from '../models/user'

export class GroupController{
    insertGroups = (req:express.Request, res:express.Response)=>{
        let groups = new Group(req.body);

        groups.save().then((grp)=>{
            res.status(200).json({'message':'Groups added'});
        }).catch((err)=>{
            res.status(400).json({'message':err});
        })
    }

    getGroups = (req:express.Request, res:express.Response)=>{
        let sex = req.body.sex;
        let sport = req.body.sport;

        Group.findOne({'sex':sex, 'sport':sport}, (err, grp)=>{
            if(err) console.log(err);
            else 
            res.json(grp);
        })
    }
}