import express from 'express';
import { authUser, singleUser, updateUser } from '../controllers/user.controller.js';

const userRouter = express.Router()

userRouter.route('/:userId').get(singleUser).put(updateUser);
userRouter.route('/login').post(authUser)

export default userRouter