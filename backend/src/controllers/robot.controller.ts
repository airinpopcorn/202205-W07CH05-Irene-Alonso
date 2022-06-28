/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { iRobot } from '../models/robot.model.js';
import { User } from '../models/user.model.js';

export class RobotController<T> {
    constructor(public model: Model<T>) {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.end(
            JSON.stringify(
                await this.model.find().populate('owner', {
                    robots: 0,
                })
            )
        );
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
            const result = await this.model
                .findById(req.params.id)
                .populate('owner', {
                    robots: 0,
                });
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
            let user;
            try {
                user = await User.findById(req.body.owner);
            } catch (error) {
                next(error);
                return;
            }
            if (!user) {
                const error = new Error('User not found');
                error.name = 'UserError';
                throw error;
            }
            const newRobot = await this.model.create(req.body);

            user.robots = [...(user.robots as Array<iRobot>), newRobot.id];
            user.save();
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.end(JSON.stringify(newRobot));
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
            const speed = (req.body as Partial<iRobot>).speed as number;
            if (speed && (speed > 10 || speed < 0)) {
                throw new RangeError('Speed must be between 0 and 10');
            }
            const life = (req.body as Partial<iRobot>).life as number;
            if (life && (life > 10 || life < 10)) {
                throw new RangeError('Life must be between 0 and 10');
            }
            const newRobot = await this.model.findByIdAndUpdate(
                req.params.id,
                req.body
            );
            resp.setHeader('Content-type', 'application/json');
            resp.end(JSON.stringify(newRobot));
        } catch (error) {
            next(error);
        }
    };

    deletePatchController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            if (req.params.id.length !== 24) {
                throw new URIError('ID length not valid');
            }
            const deleteRobot = await this.model.findById(req.params.id);
            const user = await User.findById(req.body.owner);
            if (!user) {
                throw new Error('User not found');
            }
            user.robots = user.robots?.filter((item) => item !== deleteRobot);
            resp.setHeader('Content-type', 'application/json');
            resp.end(JSON.stringify({}));
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
