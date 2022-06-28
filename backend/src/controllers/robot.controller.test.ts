/* eslint-disable no-unused-labels */
import { NextFunction, Request, Response } from 'express';
import { Robot } from '../models/robot.model';
import { User } from '../models/user.model';
import { RobotController } from './robot.controller';

jest.mock('../models/user.model');

describe('Given a function', () => {
    let controller: RobotController<{}>;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            params: { id: '62b6d5190a49db557b219d9d' },
            body: {},
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            end: jest.fn(),
        };
        next: jest.fn();
    });

    controller = new RobotController(Robot) as any;
    User.findById = jest.fn();

    describe('When we call getAllController', () => {
        test('Then the resp.end should be called', async () => {
            const mockResult = [{ test: 'test' }];
            Robot.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockResult),
            });
            await controller.getAllController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(Robot.find).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('When we call getAllController and there is an error calling the method', () => {
        test('Then next should be called', async () => {
            next = jest.fn();
            Robot.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockRejectedValue(null),
            });
            await controller.getAllController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When we call getController', () => {
        test('Then the resp.end should be called and return mockResult', async () => {
            let mockResult = {
                name: 'test',
            };
            Robot.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockResult),
            });

            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('When we call getController with a wrong id', () => {
        test('Then next should be called with an error', async () => {
            next = jest.fn();
            Robot.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(null),
            });
            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toBeCalled();
        });
        test('Then next should throw a 400 error ', async () => {
            next = jest.fn();
            req = {
                params: { id: '62b5d4943bc55ff01' },
            };
            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toBeCalledWith(expect.any(URIError));
        });
    });
    describe('When we call postController', () => {
        test('Then the resp.end should be called', async () => {
            let mockNewItem = {
                name: 'test',
            };
            (User.findById as jest.Mock).mockResolvedValue({
                robots: '',
                save: jest.fn(),
            });
            Robot.create = jest.fn().mockResolvedValue(mockNewItem);
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockNewItem));
        });
        test('Then the next function should be called', async () => {
            next = jest.fn();
            Robot.create = jest.fn().mockRejectedValue(null);
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When we call postController with no user', () => {
        test('Then the next should be called', async () => {
            let mockNewItem = {
                name: 'test',
            };
            (User.findById as jest.Mock).mockResolvedValue(null);
            Robot.create = jest.fn().mockResolvedValue(mockNewItem);
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When we call postController with a wrong user', () => {
        test('Then the next should be called', async () => {
            (User.findById as jest.Mock).mockRejectedValue(null);
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When we call patchController', () => {
        test('Then the resp.end should be called', async () => {
            let mockResult = { test: 'test' };
            Robot.findByIdAndUpdate = jest.fn().mockResolvedValue(mockResult);
            await controller.patchController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('Then it should throw an error if we pass a wrong id', async () => {
            next = jest.fn();
            req = {
                params: { id: '943bc55ff0124f6c1d' },
            };
            await controller.patchController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toBeCalled();
        });
        test('Then next should be called with an error if we pass wrong speed range', async () => {
            next = jest.fn();
            req = {
                params: { id: '62b6d5190a49db557b219d9d' },
                body: { speed: -43 },
            };
            await controller.patchController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toBeCalledWith(expect.any(RangeError));
        });
        test('Then next should be called with an error if we pass wrong life range', async () => {
            next = jest.fn();
            req = {
                params: { id: '62b6d5190a49db557b219d9d' },
                body: { life: -4 },
            };
            await controller.patchController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toBeCalledWith(expect.any(RangeError));
        });
    });
    describe('When we call deleteController', () => {
        test('Then the resp.end should be called', async () => {
            Robot.findByIdAndDelete = jest.fn().mockResolvedValue({});
            await controller.deleteController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify({}));
        });
        test('Then next should be called with a worng length id', async () => {
            next = jest.fn();
            req = {
                params: { id: '943bc55ff0124f6c1d' },
            };

            await controller.deleteController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toBeCalled();
        });
    });
});
