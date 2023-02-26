import Router from "express";
import { registerUser, loginUser } from '../controller/userController';

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);


export default userRouter


