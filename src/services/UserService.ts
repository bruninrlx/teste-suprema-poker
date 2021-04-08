import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Users from '../entities/user';
import PlayerRepository from '../repositories/playerRepositorie';

interface IRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  saldo: number;
}

class UserServices {
  public async createUser({
    name,
    cpf,
    email,
    password,
    saldo,
  }: IRequest): Promise<Users> {
    const playerRepository = getCustomRepository(PlayerRepository);

    const checkUserExists = await playerRepository.findByEmail(email);

    if (checkUserExists) {
      throw new Error('Email já está sendo usado.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await playerRepository.createUser({
      name,
      cpf,
      email,
      password: hashedPassword,
      saldo,
    });

    return user;
  }

  public async listUserById(id: string): Promise<Users | undefined> {
    const playerRepository = getCustomRepository(PlayerRepository);

    const listTransactions = await playerRepository.findById(id);

    return listTransactions;
  }

  public async listUserByCpf(cpf: string): Promise<Users | undefined> {
    const playerRepository = getCustomRepository(PlayerRepository);

    const listTransactions = await playerRepository.findByCpf(cpf);

    return listTransactions;
  }
}

export default UserServices;
