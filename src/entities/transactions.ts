import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ObjectIdColumn,
  ObjectID,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import Users from './user';

@Entity('transactions')
class Transactions {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  playerTransactionOwner: string;

  @ManyToOne(type => Users, user => user.id, { eager: true })
  @JoinColumn({ name: 'playerTransactionOwner' })
  playerTransaction: Users;

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
