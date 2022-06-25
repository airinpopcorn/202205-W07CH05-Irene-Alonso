import { Router } from 'express';
import { RobotController } from '../controllers/robot.controller.js';
import { Robot } from '../models/robot.model.js';

export const robotController = new RobotController(Robot);
export const robotRouter = Router();

robotRouter.get('/', robotController.getAllController);

robotRouter.get('/:id', robotController.getController);
robotRouter.post('/', robotController.postController);

robotRouter.patch('/:id', robotController.patchController);

robotRouter.delete('/:id', robotController.deleteController);
