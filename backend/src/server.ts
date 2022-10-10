import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import countryRouter from './routes/country.routes';
import medalRouter from './routes/medal.routes';
import recordRouter from './routes/record.routes';
import sportRouter from './routes/sport.routes';
import athleteRouter from './routes/athlete.routes';
import tournamentRouter from './routes/tournament.routes';
import resultRouter from './routes/result.routes';
import teamRouter from './routes/team.routes';
import resultTRouter from './routes/resultT.routes';
import groupRouter from './routes/group.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Olimpijada');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongo ok');
})

const router = express.Router(); //Za prihvateanje http zahteva
router.use('/Users', userRouter);
router.use('/Countries', countryRouter);
router.use('/Medals', medalRouter);
router.use('/Records', recordRouter);
router.use('/Sports', sportRouter);
router.use('/Athletes', athleteRouter);
router.use('/Tournaments', tournamentRouter);
router.use('/Results', resultRouter);
router.use('/Teams', teamRouter);
router.use('/ResultTs', resultTRouter);
router.use('/Groups', groupRouter);

app.use('/', router);// OBAVEZNO ZAMENITI
app.listen(4000, () => console.log(`Express server running on port 4000`));