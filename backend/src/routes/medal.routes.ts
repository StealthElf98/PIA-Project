import express from 'express';
import { MedalController } from '../controllers/medal.controller';

const medalRouter = express.Router();

medalRouter.route('/getAllMedals').get(
    (req, res) => new MedalController().getAllMedals(req, res)
)

medalRouter.route('/giveGold').post(
    (req, res) => new MedalController().giveGold(req, res)
)

medalRouter.route('/giveSilver').post(
    (req, res) => new MedalController().giveSilver(req, res)
)
medalRouter.route('/giveBronze').post(
    (req, res) => new MedalController().giveBronze(req, res)
)

export default medalRouter;