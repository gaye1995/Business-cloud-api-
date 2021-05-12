import express from 'express';
import { BillController } from '../controllers/BillControllers';
import { ClientController } from '../controllers/CLientsControllers';
import { authMiddleware } from '../middlewares/authMiddlewarre';
const route: express.Application = express();


route.get('/client/all', [authMiddleware],  ClientController.getCostomers)
route.get('/client/:id', [authMiddleware],  ClientController.getOneCostomers)
route.delete('/client/:id', [authMiddleware],  ClientController.deleteCustomers)
route.get('/client/facture/all', [authMiddleware],  BillController.getBill)
route.get('/client/facture/:id', [authMiddleware],  BillController.getOneBill)
route.get('/client/expense/all', [authMiddleware],  ClientController.getExpense)
route.put('/client/facture/:id', [authMiddleware],  BillController.updateBill)
route.delete('/client/facture/:id', [authMiddleware],  BillController.deleteBill)
route.get('/client/expense/:id', [authMiddleware],  ClientController.getOneExpenses)
route.delete('/client/expense/:id', [authMiddleware],  ClientController.deleteExpense)

export { route as RouterClient };