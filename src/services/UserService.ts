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

  public async updateMyUser(
    id: string,
    name: string,
    cpf: string,
    email: string,
  ): Promise<Users | undefined> {
    const playerRepository = getCustomRepository(PlayerRepository);
    const userUpdate = await playerRepository.updateUserAccount(
      id,
      name,
      cpf,
      email,
    );

    return userUpdate;
  }

  public async listUsers(): Promise<Users[] | undefined> {
    const playerRepository = getCustomRepository(PlayerRepository);
    const listPlayers = await playerRepository.find();
    return listPlayers;
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

  public async deleteMyAccount(id: string): Promise<null> {
    const playerRepository = getCustomRepository(PlayerRepository);
    await playerRepository.delete(id);

    return null;
  }
}

export default UserServices;
