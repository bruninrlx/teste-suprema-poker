import { getCustomRepository } from 'typeorm';
import Transactions from '../entities/transactions';
import TransactionRepository from '../repositories/transactionRepository';
import PlayersRepository from '../repositories/playerRepositorie';

interface Request {
  destinyPlayerCpf: string;
  transactionValue: number;
  transactionStatus: string;
  playerTransactionOwner: string;
}

class TransactionService {
  public async createTransaction({
    playerTransactionOwner,
    destinyPlayerCpf,
    transactionValue,
    transactionStatus,
  }: Request): Promise<Transactions> {
    const playersRepository = getCustomRepository(PlayersRepository);

    const selfAccount = await playersRepository.findById(
      playerTransactionOwner,
    );

    const playerDestiny = await playersRepository.findByCpf(destinyPlayerCpf);

    if (!selfAccount) {
      throw new Error('Você nao está logado');
    } else if (!playerDestiny) {
      throw new Error('Digite um usuário valido Cadastrado');
    }

    if (selfAccount.saldo < transactionValue) {
      throw new Error('Você não tem saldo o suficiente');
    }

    const transactionRepository = getCustomRepository(TransactionRepository);

    const transaction = await transactionRepository.createTransactions({
      destinyPlayerCpf,
      destinyPlayerName: playerDestiny.name,
      transactionValue,
      transactionStatus,
      playerTransactionOwner,
    });

    const newPersonalSaldo = selfAccount.saldo - transactionValue;
    const newDestinyPlayerSaldo = playerDestiny.saldo + transactionValue;

    playersRepository.updatePersonalSaldo(
      playerTransactionOwner,
      newPersonalSaldo,
    );

    playersRepository.updateDestinyPlayerSaldo(
      destinyPlayerCpf,
      newDestinyPlayerSaldo,
    );

    return transaction;
  }

  public async listMyTransactions(
    myId: string,
  ): Promise<Transactions[] | undefined> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const listTransactions = await transactionRepository.listMyTransactions(
      myId,
    );
    return listTransactions;
  }

  public async listMySpecificTransaction(
    myId: string,
  ): Promise<Transactions | undefined> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const Transaction = await transactionRepository.findOneMyTransaction(myId);
    return Transaction;
  }

  public async listReceivedTransactions(
    myId: string,
  ): Promise<Transactions[] | undefined> {
    const playersRepository = getCustomRepository(PlayersRepository);
    const transactionRepository = getCustomRepository(TransactionRepository);
    const myUser = await playersRepository.findById(myId);

    if (!myUser) {
      throw new Error('faça o login para utilizar a dashboard');
    }

    const receivedTransactions = await transactionRepository.find({
      destinyPlayerCpf: myUser.cpf,
    });

    return receivedTransactions;
  }

  public async deleteMyTransaction(myId: string): Promise<null> {
    const playersRepository = getCustomRepository(PlayersRepository);
    const transactionRepository = getCustomRepository(TransactionRepository);
    const transaction = await transactionRepository.findOneMyTransaction(myId);

    if (!transaction) {
      throw new Error(
        'Transação não encontrada, utilize o id de uma transação válida',
      );
    }

    const selfAccount = await playersRepository.findById(
      transaction.playerTransactionOwner,
    );

    const playerDestiny = await playersRepository.findByCpf(
      transaction.destinyPlayerCpf,
    );

    if (!selfAccount || !playerDestiny) {
      throw new Error(
        'Usuário não cadastrado na plataforma , ou teve a conta desativada',
      );
    }

    const myRefund = selfAccount.saldo + transaction.transactionValue;
    const discount = playerDestiny.saldo - transaction.transactionValue;

    playersRepository.updatePersonalSaldo(
      transaction.playerTransactionOwner,
      myRefund,
    );

    playersRepository.updateDestinyPlayerSaldo(
      transaction.destinyPlayerCpf,
      discount,
    );

    transactionRepository.deleteMyTransaction(myId);
    return null;
  }
}

export default TransactionService;
