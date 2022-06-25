import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { RobotController } from './robot.controller';

describe('Given a function', () => {
    let controller: RobotController<{}>;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: NextFunction = jest.fn();

    beforeEach(() => {
        req = {
            params: { id: '1' },
            body: {},
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            end: jest.fn(),
        };
    });
    const mockModel = {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };
    controller = new RobotController(
        mockModel as unknown as mongoose.Model<{}>
    );

    describe('When we call getAllController', () => {
        test('Then the resp.end should be called', async () => {
            const mockResult = [{ test: 'test' }];
            (mockModel.find as jest.Mock).mockResolvedValue(mockResult);
            await controller.getAllController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
            expect(resp.setHeader).toHaveBeenCalled();
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });

    describe('When we call getController', () => {
        test('Then the resp.end should be called', async () => {
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
        test('Then the resp.end should be called with a 404', async () => {
            (mockModel.findById as jest.Mock).mockResolvedValue(null);
            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.status).toHaveBeenCalledWith(404);
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
            expect(resp.status).toHaveBeenCalledWith(201);
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
    });
});
