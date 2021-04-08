import { Request, Response } from 'express';

import UserService from '../services/UserService';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class ProductsController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, cpf, email, password, saldo } = req.body;

      const createUserService = new UserService();

      const user = await createUserService.createUser({
        name,
        cpf,
        email,
        password,
        saldo,
      });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  public async ListPlayerByCpf(req: Request, res: Response): Promise<Response> {
    try {
      const listUserService = new UserService();
      const { cpf } = req.params;
      const playerData = await listUserService.listUserByCpf(cpf);

      return res.json(playerData);
    } catch (error) {
      return res.status(400).json({
        error:
          'falha ao encontrar esse player, verifique se o cpf está correto',
      });
    }
  }

  public async ListPlayerById(req: Request, res: Response): Promise<Response> {
    try {
      const listUserService = new UserService();
      const { id } = req.params;
      const playerData = await listUserService.listUserById(id);

      return res.json(playerData);
    } catch (error) {
      return res.status(400).json({
        error: 'falha ao encontrar esse player, verifique se o ID está correto',
      });
    }
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
