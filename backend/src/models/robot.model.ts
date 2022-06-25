/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

export interface iRobot {
    id: number;
    name: string;
    image: string;
    speed: number;
    life: number;
    dateEst: string;
}

const robotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    speed: { type: Number, min: 0, max: 10 },
    life: { type: Number, min: 0, max: 10 },
    dateEst: String,
});

export const Robot = mongoose.model('Robot', robotSchema);

await mongooseConnect();
