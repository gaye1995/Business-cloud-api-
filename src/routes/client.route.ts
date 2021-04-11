import express from 'express';
import { ClientController } from '../controllers/CLientsControllers';
import { authMiddleware } from '../middlewares/authMiddlewarre';
const route: express.Application = express();


route.get('/client/all', [authMiddleware],  ClientController.getCostomers)
route.get('/client/facture/all', [authMiddleware],  ClientController.getBill)
route.get('/client/facture/:id', [authMiddleware],  ClientController.getOneBill)
route.put('/client/facture/:id', [authMiddleware],  ClientController.updateBill)
route.delete('/client/facture/:id', [authMiddleware],  ClientController.deleteBill)

export { route as RouterClient };