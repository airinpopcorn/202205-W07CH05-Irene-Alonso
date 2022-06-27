/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';

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
            const newItem = await this.model.create(req.body);
            resp.setHeader('Content-type', 'application/json');
            resp.end(JSON.stringify(newItem));
        } catch (error) {
            next(error);
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
            resp.end(JSON.stringify(newItem));
        } catch (error) {
            next(error);
        }
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
