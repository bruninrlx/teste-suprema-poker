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

      const transaction = await createTransactionService.createTransaction({
        playerTransactionOwner,
        destinyPlayerCpf,
        transactionValue,
        transactionStatus,
      });

      return response.json(transaction);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async listaAllproducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const transactionService = new TransactionService();
    const listAllProducts = await transactionService.listTransaction();

    return response.json(listAllProducts);
  }
}
