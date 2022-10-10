import express from 'express'
import { RecordController } from '../controllers/record.controller';

const recordRouter = express.Router();

recordRouter.route('/getAllMRecords').get(
    (req, res) => new RecordController().getAllMRecords(req, res)
)

recordRouter.route('/getAllFRecords').get(
    (req, res) => new RecordController().getAllFRecords(req, res)
)

export default recordRouter;

