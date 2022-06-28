import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ExtRequest } from '../interfaces/tokens';
dotenv.config();

export const loginRequired = (
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    const authoritation = req.get('authoritation');
    let token;
    const tokenError = new Error('token missing or invalid');
    tokenError.name = 'TokenError';
    let decodedToken;
    if (authoritation && authoritation.toLowerCase().startsWith('bearer')) {
        token = authoritation.substring(7);
        decodedToken = jwt.verify(token, process.env.SECRET as string);
        if (typeof decodedToken === 'string') {
            next(tokenError);
        } else {
            (req as ExtRequest).tokenPayload = decodedToken;
            next();
        }
    } else {
        next(tokenError);
    }
};
