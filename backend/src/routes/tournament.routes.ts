import express from 'express';
import { TournamentController } from '../controllers/tournament.controller';

const tournamentRouter = express.Router();

tournamentRouter.route('/getStartDate').post(
    (req, res) => new TournamentController().getStartDate(req, res)
)

tournamentRouter.route('/disciplineExists').post(
    (req, res) => new TournamentController().disciplineExists(req, res)
)

tournamentRouter.route('/insertTournament').post(
    (req, res) => new TournamentController().insertTournament(req, res)
)

tournamentRouter.route('/getTournaments').post(
    (req, res) => new TournamentController().getTournaments(req, res)
)

tournamentRouter.route('/sportExists').post(
    (req, res) => new TournamentController().sportExists(req, res)
)

tournamentRouter.route('/checkNumOfTour').post(
    (req, res) => new TournamentController().checkNumOfTour(req, res)
)

export default tournamentRouter;