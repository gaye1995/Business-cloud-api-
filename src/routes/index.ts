import express from 'express';
import { RouterUser} from './auth.route';
import { RouterBanque } from './banque.route';
import { RouterClient } from './client.route';
import { RouterEmployee } from './employee.route';
import {RouterClocture} from './clocture.route';
const route: express.Application = express();

route.use(RouterUser);
route.use(RouterBanque);
route.use(RouterClient);
route.use(RouterEmployee);
route.use(RouterClocture);


export { route as AllRoute};