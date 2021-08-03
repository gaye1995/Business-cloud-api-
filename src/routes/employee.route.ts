import express from 'express';
import { EmployeeController } from '../controllers/EmployeeControllers';
import { authMiddleware } from '../middlewares/authMiddlewarre';
const route: express.Application = express();


route.get('/employee/all', [authMiddleware],  EmployeeController.getEmployee)
route.get('/employee/:id', [authMiddleware],  EmployeeController.getOneEmployee)
route.get('/employee/:id/note-de-frais', [authMiddleware],  EmployeeController.getUserExpense)


export { route as RouterEmployee };