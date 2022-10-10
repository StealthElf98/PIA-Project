import express from 'express';
import { SportController } from '../controllers/sport.controller';

const sportRouter = express.Router();

sportRouter.route('/insertSport').post(
    (req, res) => new SportController().insertSport(req, res)
)

sportRouter.route('/getSportId').post(
    (req, res) => new SportController().getSportId(req, res)
)

sportRouter.route('/getAllSports').get(
    (req, res) => new SportController().getAllSports(req, res)
)

sportRouter.route('/getISports').get(
    (req, res) => new SportController().getISports(req, res)
)

sportRouter.route('/getESports').get(
    (req, res) => new SportController().getESports(req, res)
)

sportRouter.route('/getAllSportss').get(
    (req, res) => new SportController().getAllSportss(req, res)
)

sportRouter.route('/checkIfOk').post(
    (req, res) => new SportController().checkIfOk(req, res)
)

sportRouter.route('/distinctDisciplines').get(
    (req, res) => new SportController().distinctDisciplines(req, res)
)

sportRouter.route('/distinctDiscipliness').get(
    (req, res) => new SportController().distinctDiscipliness(req, res)
)
export default sportRouter;