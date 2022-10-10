import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)

userRouter.route('/checkVodja').post(
    (req, res) => new UserController().checkVodja(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/getAllRequests').get(
    (req, res) => new UserController().getAllRequests(req, res)
)

userRouter.route('/getAllDelegates').get(
    (req, res) => new UserController().getAllDelegates(req, res)
)

userRouter.route('/deleteRequest').post(
    (req, res) => new UserController().deleteRequest(req, res)
)

userRouter.route('/acceptRequest').post(
    (req, res) => new UserController().acceptRequest(req, res)
)

export default userRouter;