import { Router } from 'express';

import TransactionController from '../../../../controllers/TransactionController';
import PlayerController from '../../../../controllers/userController';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';

const routes = Router();

const transactionsController = new TransactionController();
const playerController = new PlayerController();

routes.post('/session', playerController.authUser);

routes.use(ensureAuthenticated);

/* routes transactions */
routes.post('/createtransaction', transactionsController.createTransaction);
routes.get('/mytransactions/:id', transactionsController.ListMyTransactions);

routes.get(
  '/specifictransaction/:id',
  transactionsController.ListMySpecificTransaction,
);

routes.get(
  '/receivedtransactions/:id',
  transactionsController.receivedTransactions,
);

routes.delete(
  '/canceltransaction/:id',
  transactionsController.cancelMyTransaction,
);

/* routes users players */
routes.get('/listallusers', playerController.ListAllUsers);
routes.get('/showusercpf/:cpf', playerController.ListPlayerByCpf);
routes.get('/showuserid/:id', playerController.ListPlayerById);
routes.post('/createuser', playerController.createUser);
routes.put('/updatemyaccount/:id', playerController.updateMyUser);
routes.delete('/deletemyaccount/:id', playerController.deleteMyAccount);

export default routes;
