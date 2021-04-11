import { Router } from 'express';

import TransactionController from '../../../../controllers/TransactionController';
import PlayerController from '../../../../controllers/userController';
import ensureAuthenticated from '../../../../middlewares/ensureAuthenticated';

const routes = Router();

const transactionsController = new TransactionController();
const playerController = new PlayerController();

/* route login */
routes.post('/session', playerController.authUser);

/* routes transactions */
routes.post(
  '/createtransaction',
  ensureAuthenticated,
  transactionsController.createTransaction,
);

routes.get(
  '/madetransactions/:id',
  ensureAuthenticated,
  transactionsController.ListMyTransactions,
);

routes.get(
  '/specifictransaction/:id',
  ensureAuthenticated,
  transactionsController.ListMySpecificTransaction,
);

routes.get(
  '/receivedtransactions/:id',
  ensureAuthenticated,
  transactionsController.receivedTransactions,
);

routes.delete(
  '/canceltransaction/:id',
  transactionsController.cancelMyTransaction,
);

/* routes users players */
routes.post('/createuser', playerController.createUser);

routes.get('/listallusers', ensureAuthenticated, playerController.ListAllUsers);

routes.get(
  '/showusercpf/:cpf',
  ensureAuthenticated,
  playerController.ListPlayerByCpf,
);

routes.get(
  '/showuserid/:id',
  ensureAuthenticated,
  playerController.ListPlayerById,
);

routes.put(
  '/updatemyaccount/:id',
  ensureAuthenticated,
  playerController.updateMyUser,
);

routes.delete(
  '/deletemyaccount/:id',
  ensureAuthenticated,
  playerController.deleteMyAccount,
);

export default routes;
