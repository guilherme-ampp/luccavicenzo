import { Router } from 'express';
import uploadRouter from './upload';
import sessionsRouter from './sessions';
const routes = Router();

routes.use('/upload', uploadRouter);
routes.use('/sessions', sessionsRouter);

export default routes;