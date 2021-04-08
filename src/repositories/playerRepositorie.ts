import { EntityRepository, Repository } from 'typeorm';

import User from '../entities/user';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async createUser({
    name,
    cpf,
    email,
    password,
    saldo,
  }: ICreateUserDTO): Promise<User> {
    const user = this.create({ name, cpf, email, password, saldo });

    await this.save(user);
    return user;
  }

  public async updatePersonalSaldo(
    playerTransactionOwner: string,
    saldo: number,
  ): Promise<User | undefined> {
    await this.update(playerTransactionOwner, { saldo });

    const personaSaldoUpdated = this.findOne({
      where: playerTransactionOwner,
    });
    return personaSaldoUpdated;
  }

  public async updateDestinyPlayerSaldo(
    destinyPlayerCpf: string,
    saldo: number,
  ): Promise<User | undefined> {
    await this.update({ cpf: destinyPlayerCpf }, { saldo });

    const updatedDestinyPlayer = this.findOne({
      cpf: destinyPlayerCpf,
    });
    return updatedDestinyPlayer;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { email },
    });
    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { cpf },
    });
    return user;
  }

  public async findById(_id: string): Promise<User | undefined> {
    const user = await this.findOne(_id);
    return user;
  }
}

export default UserRepository;
