import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../entities/transactions';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';

@EntityRepository(Transaction)
class TransactionRepository extends Repository<Transaction> {
  public async createTransactions({
    playerTransactionOwner,
    destinyPlayerCpf,
    transactionValue,
    transactionStatus,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.create({
      playerTransactionOwner,
      destinyPlayerCpf,
      transactionValue,
      transactionStatus,
    });

    await this.save(transaction);

    return transaction;
  }

  public async listAll(): Promise<Transaction[]> {
    const transactions = await this.find();

    return transactions;
  }
}

export default TransactionRepository;
