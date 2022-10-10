import express from 'express';
import { ResultTController } from '../controllers/resultT.controller';

const resultTRouter = express.Router();

resultTRouter.route('/insertOsmina').post(
    (req, res) => new ResultTController().insertOsmina(req, res)
)

resultTRouter.route('/insertCetvrtina').post(
    (req, res) => new ResultTController().insertCetvrtina(req, res)
)

resultTRouter.route('/insertPolufinale').post(
    (req, res) => new ResultTController().insertPolufinale(req, res)
)

resultTRouter.route('/getResultT').post(
    (req, res) => new ResultTController().getResultT(req, res)
)

resultTRouter.route('/insertResultT').post(
    (req, res) => new ResultTController().insertResultT(req, res)
)

resultTRouter.route('/insertMatch').post(
    (req, res) => new ResultTController().insertMatch(req, res)
)

export default resultTRouter;