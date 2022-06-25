import express from 'express';
import morgan from 'morgan';
// import path from 'path'

import homeRouter from './router/home.js';
import { robotRouter } from './router/robot.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/', homeRouter);
app.use('/robots', robotRouter);
