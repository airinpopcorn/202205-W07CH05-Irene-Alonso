import express from 'express';
import morgan from 'morgan';
// import path from 'path'

import homeRouter from './router/home.js';
import { robotRouter } from './router/robot.js';
import cors from 'cors';
import { userRouter } from './router/user.js';
import { errorControl } from './middleware/error-control.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/', homeRouter);
app.use('/robots', robotRouter);
app.use('/users', userRouter);

app.use(errorControl);
