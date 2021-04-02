import express from 'express';
import { UserController } from '../controllers/UsersControllers';
const route: express.Application = express();

route.post('/auth/login', UserController.login);
route.post('/auth/register', UserController.register);
route.post('/auth/forget-password', UserController.forgetPassword);
route.post('/auth/update-user', UserController.updateUsers)
route.get('/auth/user', UserController.getUsers)

export { route as RouterUser };