import express from 'express';
import { BanqueController } from '../controllers/BanqueControllers';
import { authMiddleware } from '../middlewares/authMiddlewarre';
const route: express.Application = express();

route.post('/banque/createBanque', [authMiddleware], BanqueController.createBanque);
route.delete('/banque/createBanque', [authMiddleware], BanqueController.deleteBanque);

export { route as RouterBanque};