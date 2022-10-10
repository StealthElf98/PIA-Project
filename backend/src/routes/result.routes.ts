import express from 'express';
import { ResultController } from '../controllers/result.controller';

const resultRouter = express.Router();

resultRouter.route('/addResult').post(
    (req, res) => new ResultController().addResult(req, res)
)

resultRouter.route('/checkIfOk').post(
    (req, res) => new ResultController().checkIfOk(req, res)
)

resultRouter.route('/setTimeAndLocation').post(
    (req, res) => new ResultController().setTimeAndLocation(req, res)
)

resultRouter.route('/insertResults').post(
    (req, res) => new ResultController().insertResults(req, res)
)
resultRouter.route('/getOneResult').post(
    (req, res) => new ResultController().getOneResult(req, res)
)

resultRouter.route('/getAllResults').post(
    (req, res) => new ResultController().getAllResults(req, res)
)

resultRouter.route('/getFirstResult').post(
    (req, res) => new ResultController().getFirstResult(req, res)
)

export default resultRouter;