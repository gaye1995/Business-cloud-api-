import express from 'express';
import { BillController } from '../controllers/BillControllers';
import { CloctureController } from '../controllers/CloctureControllers';
import { ComptableController } from '../controllers/ComptableControllers';
import { ServiceController } from '../controllers/serviceController';
import { authMiddleware } from '../middlewares/authMiddlewarre';

const route: express.Application = express();

route.post('/auth/login', ComptableController.login);
route.post('/auth/register', ComptableController.register);
route.post('/auth/forget-password', ComptableController.forgetPassword);
route.post('/auth/user/createservice', [authMiddleware], ServiceController.createService)
route.get('/services', [authMiddleware], ServiceController.getService)
route.post('/auth/user/createfacture', [authMiddleware], BillController.CreateBill)
route.get('/auth/user/:id/factures', [authMiddleware],  BillController.getBillbyComptable)
route.get('/auth/user/:id/factures/:id', [authMiddleware],  BillController.getOneBillbyComptable)
route.put('/auth/user/createfacture', [authMiddleware], BillController.UpdateBillComptable)
route.put('/auth/update-user', [authMiddleware],  ComptableController.updateUsers)
route.get('/auth/user/all', [authMiddleware], ComptableController.getUsers)
route.get('/auth/user/:id', [authMiddleware], ComptableController.getOneUser)
route.delete('/auth/user/deconnect', ComptableController.deconnectUser)


export { route as RouterUser };