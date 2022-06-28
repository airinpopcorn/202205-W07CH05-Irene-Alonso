import { NextFunction, Request, Response } from 'express';
import { ExtRequest } from '../interfaces/tokens.js';
import { Robot } from '../models/robot.model.js';

export const userRequiredForRobot = async (
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    // (req as ExtRequest).tokenPayload.id; -> userId
    // req.params.id -> recurso Id
    const userId = (req as ExtRequest).tokenPayload.id;
    const findRobot = await Robot.findById(req.params.id);
    if (findRobot?.owner === userId) {
        next();
    } else {
        const error = new Error('Not allowed');
        error.name = 'UserAuthorizationError';
        next(error);
    }
};
