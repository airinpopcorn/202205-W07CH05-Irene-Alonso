/* eslint-disable no-unused-vars */

import { mongoConnect } from '../db/mongo.js';
import { TaskModel } from '../models/task.model';

jest.mock('../db/mongo.js');

describe('Given an instantiated model Task', () => {
    let model: TaskModel;
    let mockItem = { id: 1, test: 'test' };
    const mockFindAll = jest.fn();
    const mockFind = jest.fn();
    const mockInsertOne = jest.fn();
    const mockFindAndUpdate = jest.fn();
    const mockFindAndDelete = jest.fn();
    const mockCloseConnection = jest.fn();

    beforeEach(() => {
        (mongoConnect as jest.Mock).mockReturnValue({
            connect: { close: jest.fn() },
            collection: {
                find: mockFindAll,
                findOne: mockFind,
                insertOne: mockInsertOne,
                findOneAndUpdate: mockFindAndUpdate,
                findOneAndDelete: mockFindAndDelete,
            },
        });
        model = new TaskModel();
    });
    describe('When method findAll is called', () => {
        test('Then collection.find() should be called', async () => {
            mockFindAll.mockReturnValue({
                toArray: jest.fn().mockResolvedValue({}),
            });
            await model.findAll();
            expect(mockFindAll).toHaveBeenCalled();
        });
    });
    describe('When method find is called', () => {
        test('Then collection.findOne() should be called and an item should be found', async () => {
            mockFind.mockReturnValue({
                toArray: jest.fn().mockResolvedValue(mockItem),
            });
            await model.find('62b4a4d2bc8482f51590b1c1');
            expect(mockFind).toHaveBeenCalled();
        });
        test('Then collection.findOne() should return null', async () => {
            mockFind.mockReturnValue(null);
            const result = await model.find('62b4a4d2bc8482f51590b1c1');
            expect(mockFind).toHaveBeenCalled();
            expect(result).toBe(undefined);
        });
    });
    describe('When method create is called', () => {
        test('Then collection.insertOne should be called', async () => {
            mockInsertOne.mockResolvedValue(mockItem);
            await model.create(mockItem);
            expect(mockInsertOne).toHaveBeenCalled();
        });
    });
    describe('When method update is called', () => {
        test('Then collection.findOneAndUpdate should be called', async () => {
            mockFindAndUpdate.mockResolvedValue(mockItem);
            await model.update('62b4a4d2bc8482f51590b1c1', mockItem);
            expect(mockFindAndUpdate).toHaveBeenCalled();
        });
    });
    describe('When method delete is called', () => {
        test('Then collection.findOneAndDelete should be called', async () => {
            mockFindAndDelete.mockResolvedValue({ value: true });
            const result = await model.delete('62b4a4d2bc8482f51590b1c1');
            expect(mockFindAndDelete).toHaveBeenCalled();
            expect(result.status).toBe(202);
        });
        test('Then collection.findOneAndDelete should be called', async () => {
            mockFindAndDelete.mockResolvedValue({ value: false });
            const result = await model.delete('62b4a4d2bc8482f51590b1c1');
            expect(mockFindAndDelete).toHaveBeenCalled();
            expect(result.status).toBe(404);
        });
    });
});
