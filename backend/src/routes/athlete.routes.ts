import express from 'express';
import AthleteController from '../controllers/athlete.controller';

const athleteRouter = express.Router();

athleteRouter.route('/addAthlete').post(
    (req, res) => new AthleteController().addAthlete(req, res)
)

athleteRouter.route('/sameSport').post(
    (req, res) => new AthleteController().sameSport(req, res)
)

athleteRouter.route('/alreadyExists').post(
    (req, res) => new AthleteController().alreadyExists(req, res)
)

athleteRouter.route('/getAllAthletesByParam').post(
    (req, res) => new AthleteController().getAllAthletesByParam(req, res)
)

athleteRouter.route('/getAthletesByDiscipline').post(
    (req, res) => new AthleteController().getAthletesByDiscipline(req, res)
)

athleteRouter.route('/enoughAthletes').post(
    (req, res) => new AthleteController().enoughAthletes(req, res)
)

athleteRouter.route('/giveMedals').post(
    (req, res) => new AthleteController().giveMedals(req, res)
)

athleteRouter.route('/giveGold').post(
    (req, res) => new AthleteController().giveGold(req, res)
)

athleteRouter.route('/giveSilver').post(
    (req, res) => new AthleteController().giveSilver(req, res)
)

athleteRouter.route('/giveBronze').post(
    (req, res) => new AthleteController().giveBronze(req, res)
)

athleteRouter.route('/getTenisPlayers').post(
    (req, res) => new AthleteController().getTenisPlayers(req, res)
)

athleteRouter.route('/getAthlete').post(
    (req, res) => new AthleteController().getAthlete(req, res)
)

athleteRouter.route('/doubleExists').post(
    (req, res) => new AthleteController().doubleExists(req, res)
)

athleteRouter.route('/getDoubles').post(
    (req, res) => new AthleteController().getDoubles(req, res)
)

athleteRouter.route('/getAllAthletesFromCountry').post(
    (req, res) => new AthleteController().getAllAthletesFromCountry(req, res)
)

athleteRouter.route('/getAllDisciplinesFromCountry').post(
    (req, res) => new AthleteController().getAllDisciplinesFromCountry(req, res)
)

athleteRouter.route('/getAllAthletesByDiscipline').post(
    (req, res) => new AthleteController().getAllAthletesByDiscipline(req, res)
)

athleteRouter.route('/getAllAthletesBySport').post(
    (req, res) => new AthleteController().getAllAthletesBySport(req, res)
)

export default athleteRouter;