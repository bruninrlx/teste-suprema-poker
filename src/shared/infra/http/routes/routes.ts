import { Router } from 'express';

import TransactionController from '../../../../controllers/TransactionController';
import PlayerController from '../../../../controllers/userController';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';

const routes = Router();

const transactionsController = new TransactionController();
const playerController = new PlayerController();

routes.post('/session', playerController.authUser);

routes.use(ensureAuthenticated);

routes.post('/createtransaction', transactionsController.createTransaction);
routes.get(
  '/listapersonaltransactions',
  transactionsController.listaAllproducts,
);

routes.get('/showusercpf/:cpf', playerController.ListPlayerByCpf);
routes.get('/showuserid/:id', playerController.ListPlayerById);
routes.post('/createuser', playerController.createUser);

export default routes;
