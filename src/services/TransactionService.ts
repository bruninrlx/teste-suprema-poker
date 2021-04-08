import { getCustomRepository, getMongoRepository } from 'typeorm';
import Transactions from '../entities/transactions';
import Users from '../entities/user';
import TransactionRepository from '../repositories/transactionRepository';
import PlayersRepository from '../repositories/playerRepositorie';

interface Request {
  destinyPlayerCpf: string;
  playerTransactionOwner: string;
  transactionValue: number;
  transactionStatus: string;
}

class TransactionService {
  public async createTransaction({
    playerTransactionOwner,
    destinyPlayerCpf,
    transactionValue,
    transactionStatus,
  }: Request): Promise<Transactions> {
    const playersRepository = getCustomRepository(PlayersRepository);

    const selfId = await playersRepository.findById(playerTransactionOwner);
    const playerDestiny = await playersRepository.findByCpf(destinyPlayerCpf);

    if (!selfId) {
      throw new Error('Você nao está logado');
    }

    if (!playerDestiny) {
      throw new Error('Digite um usuário valido Cadastrado');
    }

    const { saldo } = selfId;

    if (saldo < transactionValue) {
      throw new Error('Você não tem saldo o suficiente');
    }

    const transactionRepository = getCustomRepository(TransactionRepository);

    const transaction = await transactionRepository.createTransactions({
      destinyPlayerCpf,
      playerTransactionOwner,
      transactionValue,
      transactionStatus,
    });

    return transaction;
  }

  public async listTransaction(): Promise<Transactions[]> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const listTransactions = await transactionRepository.listAll();
    return listTransactions;
  }
}

export default TransactionService;
