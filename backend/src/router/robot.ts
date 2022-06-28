import { Router } from 'express';
import { RobotController } from '../controllers/robot.controller.js';
import { loginRequired } from '../middleware/login-required.js';
import { userRequiredForRobot } from '../middleware/user-required.js';
import { Robot } from '../models/robot.model.js';

export const robotController = new RobotController(Robot);
export const robotRouter = Router();

robotRouter.get('/', loginRequired, robotController.getAllController);

robotRouter.get('/:id', robotController.getController);
robotRouter.post('/', loginRequired, robotController.postController);
// robotRouter.patch('/delete/:id', robotController.deletePatchController);
robotRouter.patch(
    '/:id',
    loginRequired,
    userRequiredForRobot,
    robotController.patchController
);

robotRouter.delete(
    '/:id',
    loginRequired,
    userRequiredForRobot,
    robotController.deleteController
);
