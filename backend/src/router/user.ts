import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { User } from '../models/user.model';

export const userController = new UserController(User);
export const userRouter = Router();

userRouter.get('/', userController.getAllController);

userRouter.get('/:id', userController.getController);
userRouter.post('/', userController.postController);
userRouter.patch('/:id', userController.patchController);

userRouter.delete('/:id', userController.deleteController);
