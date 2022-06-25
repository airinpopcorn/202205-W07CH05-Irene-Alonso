/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { iRobot } from '../models/robot.model';

export class RobotController<T> {
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
            resp.status(201);
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
            const speed = (JSON.parse(req.body) as Partial<iRobot>)
                .speed as number;
            if (speed && (speed > 10 || speed < 0)) {
                throw new RangeError('Speed must be between 0 and 10');
            }
            const life = (JSON.parse(req.body) as Partial<iRobot>)
                .life as number;
            if (life && (life > 10 || life < 10)) {
                throw new RangeError('Life must be between 0 and 10');
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
