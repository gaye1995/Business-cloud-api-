import express from 'express';
import { CloctureController } from '../controllers/CloctureControllers';
import { authMiddleware } from '../middlewares/authMiddlewarre';

const route: express.Application = express();

route.post('/bilan/create-bilan/actif', [authMiddleware], CloctureController.createBilanActif)
route.post('/bilan/create-bilan/passif', [authMiddleware], CloctureController.createBilanPassif)
route.put('/bilan/create-bilan/passif', [authMiddleware], CloctureController.updatePassif)
route.put('/bilan/create-bilan/actif', [authMiddleware], CloctureController.updateActif)
route.post('/compteRs/create-compteRs/charge', [authMiddleware], CloctureController.createCharge)
route.put('/compteRs/create-compteRs/charge', [authMiddleware], CloctureController.updateCharge)


export { route as RouterClocture};