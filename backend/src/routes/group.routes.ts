import express from 'express';
import { GroupController } from '../controllers/group.controller';

const groupRouter = express.Router();

groupRouter.route('/insertGroups').post(
    (req, res) => new GroupController().insertGroups(req, res)
)

groupRouter.route('/getGroups').post(
    (req, res) => new GroupController().getGroups(req, res)
)

export default groupRouter;