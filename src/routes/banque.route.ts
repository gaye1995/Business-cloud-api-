import express from 'express';
import { BanqueController } from '../controllers/BanqueControllers';
import { authMiddleware } from '../middlewares/authMiddlewarre';
const route: express.Application = express();

route.post('/banque/createBanque', [authMiddleware], BanqueController.createBanque);
route.get('/banque/all', [authMiddleware], BanqueController.listeBanque);
route.get('/banque/:id', [authMiddleware], BanqueController.getOneBanque);
route.put('/banque/updateBanque/:id', [authMiddleware], BanqueController.updateBanque);
route.delete('/banque/createBanque', [authMiddleware], BanqueController.deleteBanque);

export { route as RouterBanque};