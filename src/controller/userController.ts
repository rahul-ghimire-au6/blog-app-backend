import userModel from '../model/userModel';
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import handleError from '../helper/errorHandler';
import { userRegistrationData, userLoginData } from '../interfaces/userInterface';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    try {
        let userData: userRegistrationData = req.body;
        //encrypting password using bcrypt
        const encryptedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = encryptedPassword;
        //saving user data to db
        const saveUserData = await userModel.create(userData);
        //sending success response
        return res.status(201).json({
            success: true,
            message: "user registered successfully"
        })
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const userLoginData: userLoginData = req.body;
        //fetching userData from db to get stored password also it validates user
        const fetchUser = await userModel.findOne({ email: userLoginData.email }).lean();
        if (!fetchUser) {
            throw { name: "validationError", message: "please send a valid Email" }
        }
        //validating password
        let isPasswordCorrect = await bcrypt.compare(userLoginData.password, fetchUser.password as string)
        if (isPasswordCorrect) {
            //generate jwt token
            const token = jwt.sign({ data: userLoginData.email }, 'secret', { expiresIn: '1h' });
            return res.status(200).json({
                success: true,
                message: "user loggedIn successfully",
                data: { authToken: token }
            })
        } else {
            return handleError(res, { name: "validationError", message: "Email or Password Entered is Wrong" }, 401)
        }
    } catch (err) {
        return handleError(res, err as Error);
    }
}