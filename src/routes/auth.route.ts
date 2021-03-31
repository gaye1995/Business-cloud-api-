import express from 'express';
import { UserController } from '../controllers/UsersControllers';
const route: express.Application = express();

route.post('/auth/login', UserController.login);
route.post('/auth/register', UserController.register);
route.post('/auth/forget-password', UserController.resetPassword);
route.get('/auth/user', UserController.getUsers)

export { route as RouterUser };