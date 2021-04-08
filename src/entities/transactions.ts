import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';
import Users from './user';

@Entity('transactions')
class Transactions {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  playerTransactionOwner: string;

  @Column()
  destinyPlayerCpf: string;

  @Column()
  destinyPlayerName: string;

  @Column('numeric')
  transactionValue: number;

  @Column()
  transactionStatus: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transactions;
