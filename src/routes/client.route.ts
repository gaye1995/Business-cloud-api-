import express from 'express';
import { ClientController } from '../controllers/CLientsControllers';
import { authMiddleware } from '../middlewares/authMiddlewarre';
const route: express.Application = express();


route.get('/client/all', [authMiddleware],  ClientController.getCostomers)
route.get('/client/facture/all', [authMiddleware],  ClientController.getBill)

export { route as RouterClient };