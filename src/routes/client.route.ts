import express from 'express';
import { BillController } from '../controllers/BillControllers';
import { ClientController } from '../controllers/CLientsControllers';
import { authMiddleware } from '../middlewares/authMiddlewarre';
const route: express.Application = express();


route.get('/client/all', [authMiddleware],  ClientController.getCostomers)
route.get('/client/:id', [authMiddleware],  ClientController.getOneCostomers)
route.get('/client/facture/all', [authMiddleware],  BillController.getBill)
route.get('/client/facture/:id', [authMiddleware],  BillController.getOneBill)
route.put('/client/facture/:id', [authMiddleware],  BillController.updateBill)
route.delete('/client/facture/:id', [authMiddleware],  BillController.deleteBill)

export { route as RouterClient };