import mongoose from 'mongoose';
import { iRelationField } from '../db/mongoose.js';

export interface iUser {
    id: string;
    name: string;
    email: string;
    robots: Array<iRelationField>;
}

const userSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    email: mongoose.SchemaTypes.String,
    robots: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Robot',
        },
    ],
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});

export const User = mongoose.model('User', userSchema);
