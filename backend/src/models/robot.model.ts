/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';

export interface iRobot {
    id: number;
    name: string;
    image: string;
    speed: number;
    life: number;
    dateEst: string;
}

const robotSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    speed: { type: Number, min: 0, max: 10 },
    life: { type: Number, min: 0, max: 10 },
    dateEst: String,
});

export const Robot = mongoose.model('Robot', robotSchema);
