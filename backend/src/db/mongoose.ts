import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function mongooseConnect() {
    const url = process.env.URL_MONGO;
    return mongoose.connect(url as string);
}
