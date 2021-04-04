import express from 'express';
import { UserController } from '../controllers/UsersControllers';
import { authMiddleware } from '../middlewares/authMiddlewarre';
const route: express.Application = express();

route.post('/auth/login', UserController.login);
route.post('/auth/register', UserController.register);
route.post('/auth/forget-password', UserController.forgetPassword);
route.post('/auth/update-user', [authMiddleware],  UserController.updateUsers)
route.get('/auth/user', [authMiddleware], UserController.getUsers)

export { route as RouterUser };