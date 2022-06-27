import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
// import path from 'path'

import homeRouter from './router/home.js';
import { robotRouter } from './router/robot.js';
import cors from 'cors';
import { userRouter } from './router/user.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/', homeRouter);
app.use('/robots', robotRouter);
app.use('/users', userRouter);
app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
    req;
    next;
    let status = 500;
    switch (error.name) {
        case 'ValidationError':
            status = 406;
            break;

        case 'ReferenceError':
            status = 404;
            break;

        case 'URIErrir':
            status = 400;
            break;

        default:
            status;
            break;
    }

    resp.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.end(JSON.stringify(result));
});
