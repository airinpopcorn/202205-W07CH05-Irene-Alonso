/* eslint-disable no-unused-labels */
import { NextFunction, Request, Response } from 'express';
import { Robot } from '../models/robot.model';
import { RobotController } from './robot.controller';

Robot;
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
    const mockModel = {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };
    controller = new RobotController(Robot) as any;

    describe('When we call getAllController', () => {
        test('Then the resp.end should be called', async () => {
            const mockResult = [{ test: 'test' }];
            Robot.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockResult),
            });
            await controller.getAllController(req as Request, resp as Response);
            expect(Robot.find).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });

    describe('When we call getController', () => {
        test('Then the resp.end should be called and return mockResult', async () => {
            let mockResult = {
                name: 'test',
            };
            (mockModel.findById as jest.Mock).mockResolvedValue(mockResult);

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
            (mockModel.findById as jest.Mock).mockResolvedValue(null);
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
            (mockModel.create as jest.Mock).mockResolvedValue(mockNewItem);
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
            (mockModel.create as jest.Mock).mockRejectedValue(null);
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalledWith(null);
        });
    });
    describe('When we call patchController', () => {
        test('Then the resp.end should be called', async () => {
            let mockResult = { test: 'test' };
            (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
                mockResult
            );
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
            (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue({});
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
