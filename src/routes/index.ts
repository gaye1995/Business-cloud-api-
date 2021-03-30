import express from 'express';
import { RouterUser} from './auth.route';

const route: express.Application = express();

route.use(RouterUser);
route.use(RouterUser);

export { route as AllRoute};