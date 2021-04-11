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
route.get('/auth/create-bilan/actif', [authMiddleware], CloctureController.createBilanActif)
route.get('/auth/create-bilan/passif', [authMiddleware], CloctureController.createBilanPassif)



export { route as RouterUser };