import { EntityRepository, Repository } from 'typeorm';

import User from '../entities/user';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface;
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
    originPlayer: string,
    saldo: number,
  ): Promise<User | number> {
    const saldoUpdate = await this.update(originPlayer, { saldo });
    await this.save(saldoUpdate);
    return saldoUpdate;
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
