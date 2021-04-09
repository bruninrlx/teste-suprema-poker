import { Request, Response } from 'express';

import UserService from '../services/UserService';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class ProductsController {
  public async createUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { name, cpf, email, password, saldo } = request.body;

      const createUserService = new UserService();

      const user = await createUserService.createUser({
        name,
        cpf,
        email,
        password,
        saldo,
      });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async updateMyUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { name, cpf, email } = request.body;
      const userService = new UserService();
      const { id } = request.params;

      const MyAccountUpdated = await userService.updateMyUser(
        id,
        name,
        cpf,
        email,
      );
      return response.status(200).json(MyAccountUpdated);
    } catch (error) {
      return response.status(400).json({
        error:
          'Não foi possivel atualizar os dados, verifique se os dados estão corretos',
      });
    }
  }

  public async ListPlayerByCpf(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const listUserService = new UserService();
      const { cpf } = request.params;
      const playerData = await listUserService.listUserByCpf(cpf);

      return response.json(playerData);
    } catch (error) {
      return response.status(400).json({
        error:
          'falha ao encontrar esse player, verifique se o cpf está correto',
      });
    }
  }

  public async ListPlayerById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const listUserService = new UserService();
      const { id } = request.params;
      const playerData = await listUserService.listUserById(id);

      return response.json(playerData);
    } catch (error) {
      return response.status(400).json({
        error: 'falha ao encontrar esse player, verifique se o ID está correto',
      });
    }
  }

  public async deleteMyAccount(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userService = new UserService();

    const { id } = request.params;

    userService.deleteMyAccount(id);

    return response.status(200).json('conta deletada com sucesso');
  }

  public async authUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUser = new AuthenticateUserService();

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      return response.json({ user, token });
    } catch (err) {
      return response.status(400).json({ err: err.message });
    }
  }
}
