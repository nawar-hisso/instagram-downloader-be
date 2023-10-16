import { Router } from 'express';
import ROUTES from '../configs/routes.js';
import { home } from '../controllers/default.controllers.js';

const defaultRouter = Router();
defaultRouter.get(ROUTES.HOME.ROOT, home);

export default defaultRouter;
