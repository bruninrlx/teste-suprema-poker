import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../entities/transactions';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';

@EntityRepository(Transaction)
class TransactionRepository extends Repository<Transaction> {
  public async createTransactions({
    playerTransactionOwner,
    destinyPlayerCpf,
    destinyPlayerName,
    transactionValue,
    transactionStatus,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.create({
      playerTransactionOwner,
      destinyPlayerCpf,
      destinyPlayerName,
      transactionValue,
      transactionStatus,
    });

    await this.save(transaction);

    return transaction;
  }

  public async listMyTransactions(
    myId: string,
  ): Promise<Transaction[] | undefined> {
    const transactions = await this.find({
      playerTransactionOwner: myId,
    });

    return transactions;
  }

  public async findOneMyTransaction(
    myId: string,
  ): Promise<Transaction | undefined> {
    const transaction = await this.findOne(myId);

    return transaction;
  }

  public async deleteMyTransaction(myTransactionId: string): Promise<null> {
    this.delete(myTransactionId);

    return null;
  }
}

export default TransactionRepository;
