import express from 'express';
import { EmployeeController } from '../controllers/EmployeeControllers';
import { authMiddleware } from '../middlewares/authMiddlewarre';
const route: express.Application = express();


route.get('/employee/all', [authMiddleware],  EmployeeController.getEmployee)

export { route as RouterEmployee };