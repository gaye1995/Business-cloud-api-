import express from 'express';
import { BanqueController } from '../controllers/BanqueControllers';
const route: express.Application = express();

route.post('/banque/create', BanqueController.createBanque);

export { route as RouterBanque};