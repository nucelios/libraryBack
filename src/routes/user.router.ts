
import { UserController } from '@/controllers/user.controller';
import { IRoute } from '@/interfaces/IRoute.interface';
import { authValidate } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class UserRouter implements IRoute {
  public path = '/users';
  router: Router = Router();
  private controller: UserController;

  constructor() {
    this.controller = new UserController();
    this.init();
  }
  private init() {
    this.router.post('', this.controller.register);
    this.router.post('/sessions', this.controller.signIn);
    this.router.delete('/logout', authValidate, this.controller.logout);
  }
}