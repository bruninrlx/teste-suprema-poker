import Users from '../entities/user';

export default interface ICreateTransactionDTO {
  destinyPlayerCpf: string;
  destinyPlayerName: string;
  transactionValue: number;
  transactionStatus: string;
  playerTransactionOwner: string;
}
