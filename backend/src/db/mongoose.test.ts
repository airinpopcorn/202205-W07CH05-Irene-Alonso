import mongoose from 'mongoose';
import { mongooseConnect } from './mongoose';
jest.mock('mongoose');
describe('Given the mongooseConnect function', () => {
    describe('When calling it', () => {
        test('Then it should open a connection with Mongoose', async () => {
            mongoose.connect = jest.fn();
            expect(mongooseConnect).toHaveBeenCalled();
        });
    });
});
