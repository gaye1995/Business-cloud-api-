import express from 'express';
import { UserController } from '../controllers/UserController';

const route: express.Application = express();

route.post('/auth/login', UserController.login);
route.post('/auth/register', UserController.register);
route.post('/auth/forget-password', UserController.requestPasswordLost);


export { route as RouterUser };