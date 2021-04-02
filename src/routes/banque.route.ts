import express from 'express';
import { BanqueController } from '../controllers/BanqueControllers';
const route: express.Application = express();

route.post('/banque/createBanque', BanqueController.createBanque);

export { route as RouterBanque};