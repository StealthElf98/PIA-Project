import express from 'express'
import TeamController from '../controllers/team.controller';

const teamRouter = express.Router();

teamRouter.route('/addTeam').post(
    (req, res) => new TeamController().addTeam(req, res)
)

teamRouter.route('/teamExists').post(
    (req, res) => new TeamController().teamExists(req, res)
)

teamRouter.route('/getTeams').post(
    (req, res) => new TeamController().getTeams(req, res)
)

teamRouter.route('/getITeams').post(
    (req, res) => new TeamController().getITeams(req, res)
)
export default teamRouter;