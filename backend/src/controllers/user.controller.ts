import express from 'express';
import User from '../models/user'

export class UserController{
    login = (req:express.Request, res:express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username':username, 'password':password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    checkVodja = (req:express.Request, res:express.Response)=>{
        let country = req.body.country;
        let type = req.body.type;
        let ok = req.body.ok;

        User.findOne({'country':country,'type':type,'ok':ok}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    register = (req:express.Request, res:express.Response) => {
        let user = new User(req.body);

        user.save().then((user)=>{
            res.status(200).json({'message':'User added'});
        }).catch((err)=>{
            res.status(400).json({'message':err});
        })
    }
    
    changePassword = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let npassword = req.body.npassword;

        User.findOneAndUpdate({'username':username, 'password':password}, {$set: {'password':npassword}}, {new:true}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    getAllRequests = (req:express.Request, res:express.Response)=>{
        User.find({'ok': 0}, (err, users)=>{
            if(err) console.log(err);
            else{
                res.json(users);
            }
        })
    }

    deleteRequest = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOneAndDelete({'username':username, 'password':password},(err, user)=>{
            if(err) console.log(err);
            else{
                res.json(user);
            }
        })
    }

    acceptRequest = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOneAndUpdate({'username':username, 'password':password},{$set: {'ok':1}}, (err, user)=>{
            if(err) console.log(err);
            else{
                res.json(user);
            }
        })
    }

    getAllDelegates = (req:express.Request, res:express.Response)=>{
        User.find({'type':1}, (err, users)=>{
            if(err) console.log(err);
            else{
                res.json(users);
            }
        })
    }
    
}