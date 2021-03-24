import { Router } from 'express';

import { container } from 'tsyringe';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
