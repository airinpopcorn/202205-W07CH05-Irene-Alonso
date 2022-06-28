/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export class UserController<T> {
    constructor(public model: Model<T>) {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.end(JSON.stringify(await this.model.find()));
    };

    getController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            if (req.params.id.length !== 24) {
                throw new URIError('ID length not valid');
            }
            resp.setHeader('Content-type', 'application/json');
            const result = await this.model.findById(req.params.id);
            if (result) {
                resp.end(JSON.stringify(result));
            } else {
                throw new ReferenceError('Item not found');
            }
        } catch (error) {
            next(error);
        }
    };

    postController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const newUser = await this.model.create(req.body);
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.end(JSON.stringify(newUser));
        } catch (error) {
            next(error);
            return;
        }
    };

    patchController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            if (req.params.id.length !== 24) {
                throw new URIError('ID length not valid');
            }
            const newItem = await this.model.findByIdAndUpdate(
                req.params.id,
                req.body
            );
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.end(JSON.stringify(newItem));
        } catch (error) {
            next(error);
        }
    };

    loginController = async (
        //Esto es información dirigida al servidor
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        req.body.password;
        const user: any = await this.model.findOne({ email: req.body.email });
        const passwordCompare = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!user || !passwordCompare) {
            const error = new Error('Invalid user or password');
            error.name = 'UserAuthorizationError';
            next(error);
            return;
        }
        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.SECRET as string
        );
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.end(JSON.stringify({ token, id: user.id }));
    };

    deleteController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            if (req.params.id.length !== 24) {
                throw new URIError('ID length not valid');
            }
            await this.model.findByIdAndDelete(req.params.id);
            resp.end(JSON.stringify({}));
        } catch (error) {
            next(error);
        }
    };
}
