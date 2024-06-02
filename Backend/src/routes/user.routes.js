import express from 'express';
import { authUser, logOutUser, singleUser, updateUser } from '../controllers/user.controller.js';

const userRouter = express.Router()

userRouter.route('/:userId').get(singleUser)
userRouter.route('/:userId').put(updateUser);
userRouter.route('/login').post(authUser)
userRouter.route('/logOut').post(logOutUser)

export default userRouter