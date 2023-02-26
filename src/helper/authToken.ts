import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import handleError from './errorHandler';
import userModel from '../model/userModel';
import { Types } from 'mongoose'

interface customJwtPayload {
    data: string,
    iat: number,
    exp: number
}


export interface UserModel {
    _id: Types.ObjectId,
    name: string,
    email: string,
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return handleError(res, { name: "JsonWebTokenError", message: "No token provided!" }, 403);
        }
        const jwtData = jwt.verify(token, "secret") as customJwtPayload
        const userEmail = jwtData.data;
        const userData = await userModel.findOne({ email: userEmail }, { __v: 0, password: 0, createdAt: 0, updatedAt: 0 }).lean()
        if (!userData) throw new Error('Something went wrong');
        req.currentUser = userData as UserModel;
        next()
    } catch (err) {
        return handleError(res, err as Error)
    }
}