export default interface ICreateTransactionDTO {
  originPlayerName: string;
  destinyPlayerCpf: string;
  destinyPlayerName: string;
  transactionValue: number;
  transactionStatus: string;
  playerTransactionOwner: string;
}
