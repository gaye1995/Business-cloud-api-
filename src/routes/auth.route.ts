import express from 'express';
import { CloctureController } from '../controllers/CloctureControllers';
import { ComptableController } from '../controllers/ComptableControllers';
import { authMiddleware } from '../middlewares/authMiddlewarre';

const route: express.Application = express();

route.post('/auth/login', ComptableController.login);
route.post('/auth/register', ComptableController.register);
route.post('/auth/forget-password', ComptableController.forgetPassword);
route.post('/auth/update-user', [authMiddleware],  ComptableController.updateUsers)
route.get('/auth/user/all', [authMiddleware], ComptableController.getUsers)
route.post('/auth/user/deconnect', [authMiddleware], CloctureController.createBilanActif)


export { route as RouterUser };