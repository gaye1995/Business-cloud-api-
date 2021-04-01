import express from 'express';
import { RouterUser} from './auth.route';
import { RouterBanque } from './banque.route';

const route: express.Application = express();

route.use(RouterUser);
route.use(RouterBanque);

export { route as AllRoute};