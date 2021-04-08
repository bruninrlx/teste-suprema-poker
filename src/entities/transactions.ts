import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
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
  destinyPlayerCpf: string;

  @Column()
  player_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'player_id' })
  playerTransactionOwner: string;

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
