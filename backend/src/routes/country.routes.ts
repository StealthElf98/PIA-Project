import express from 'express';
import { CountryController } from '../controllers/country.controller';

const countryRouter = express.Router();

countryRouter.route('/getAllCountries').get(
    (req, res) => new CountryController().getAllCountries(req, res)
)

countryRouter.route('/getAllDistinctCountries').get(
    (req, res) => new CountryController().getAllDistinctCountries(req, res)
)

countryRouter.route('/updateNum').post(
    (req, res) => new CountryController().updateNum(req, res)
)


export default countryRouter;