import express from 'express';
import Country from '../models/country';

export class CountryController{
    getAllCountries = (req:express.Request, res:express.Response)=>{
        Country.find({}, (err, countries)=>{
            if(err) console.log(err);
            else{
                res.json(countries);
            }
        })
    }
    getAllDistinctCountries  = (req:express.Request, res:express.Response)=>{
        Country.distinct("name", (err, countries)=>{
            if(err) console.log(err);
            else{
                countries.unshift("All Coutries");
                res.json(countries);
            }
        })
    }

    updateNum = (req:express.Request, res:express.Response)=>{
        let country = req.body.country;
        let num = req.body.num;

        Country.updateOne({'name':country}, {$inc:{'numberOfParticipants':num}}, (err, countries)=>{
            if(err) console.log(err);
            else{
                res.json(countries);
            }
        })
    }
}