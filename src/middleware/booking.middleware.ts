import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api_errors";
import UserService from "../services/user.service";
import UserModel from "../models/user.dal";

const userService = new UserService(new UserModel());

export const attachRole = async (req: any, res: Response, next: NextFunction) => {
    try {
       const userId = req.body.user_id || req.params.userId;

        if (!userId) {
            return next(ApiError.BadRequest("Не указан user_id"));
        }
        
        req.userRole = await userService.getUserById(userId);
        next();

    } catch (e) {
        next(e)
    }
}