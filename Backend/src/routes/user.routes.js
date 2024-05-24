import express from 'express';
import { authUser } from '../controllers/user.controller.js';

const userRouter = express.Router()

userRouter.route('/login').post(authUser)

export default userRouter