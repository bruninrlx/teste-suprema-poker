import { Request, Response } from 'express';
import TransactionService from '../services/TransactionService';

export default class TransactionController {
  public async createTransaction(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const {
        playerTransactionOwner,
        destinyPlayerCpf,
        transactionValue,
        transactionStatus,
      } = request.body;

      const createTransactionService = new TransactionService();

      await createTransactionService.createTransaction({
        playerTransactionOwner,
        destinyPlayerCpf,
        transactionValue,
        transactionStatus,
      });

      return response
        .status(200)
        .json({ message: 'transação concluída com sucesso' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async ListMyTransactions(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const transactionService = new TransactionService();

    const myTransactions = await transactionService.listMyTransactions(
      request.params.id,
    );
    return response.json(myTransactions);
  }

  public async ListMySpecificTransaction(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const transactionService = new TransactionService();

    const myTransactions = await transactionService.listMySpecificTransaction(
      request.params.id,
    );
    return response.json(myTransactions);
  }

  public async receivedTransactions(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const transactionService = new TransactionService();
    const receivedTransactions = await transactionService.listReceivedTransactions(
      request.params.id,
    );

    if (!receivedTransactions) {
      throw new Error('Você ainda não recebeu nenhuma transação');
    }

    const abstractTransaction = receivedTransactions.map(
      ({ id, originPlayerName, transactionValue, created_at }) => ({
        id,
        originPlayerName,
        transactionValue,
        created_at,
      }),
    );
    return response.json(abstractTransaction);
  }

  public async cancelMyTransaction(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const transactionService = new TransactionService();
      await transactionService.deleteMyTransaction(request.params.id);

      return response.status(400).json('transação deletada com sucesso');
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
