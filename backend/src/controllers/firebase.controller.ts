import { NextFunction, Request, Response } from "express";
import { createToken, deleteToken, deleteTokenByUserId, findToken } from "../services/firebase.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const saveFirebaseToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user.id;
        const { fcm_token } = req.body;

        await deleteToken(fcm_token)
        await createToken(user_id, fcm_token);

        return res.status(201).json({
            success: true,
            message: "Token saved successfully",
        })
    } catch (error) {
        next(error)
    }
}

export const deleteFirebaseToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user.id;
        console.log('user_id', user_id);
        await deleteTokenByUserId(user_id);

        return res.status(204).json({
            success: true,
            message: 'Token deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}