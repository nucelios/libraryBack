import { UserDto } from '@/dto/User.dto';
import { RequestWithUser } from '@/interfaces/Request.interface';
import { UserService } from '@/service/user.service';
import { plainToInstance } from 'class-transformer';
import { RequestHandler } from 'express';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  signIn: RequestHandler = async (req, res) => {
    try {
      const signInUserDto = plainToInstance(UserDto, req.body);
      const user = await this.service.sigIn(signInUserDto);
      return res.send(user);
    } catch (e) {
      console.dir(e);
      return res.status(400).send({ error: { message: (e as Error).message } })
    }
  };

  register: RequestHandler = async (req, res) => {
    try {
      const registerUserDto = plainToInstance(UserDto, req.body);

      const user = await this.service.register(registerUserDto);

      return res.send(user);
    } catch (e) {
      console.dir(e);
      if ((e as { code: string }).code === 'ER_DUP_ENTRY') {
        return res.status(400).send({ error: { message: 'User already exist' } });
      }
      return res.status(500).send({ error: { message: 'Internal server error' } });
    }
  };
  logout: RequestHandler = async (req: RequestWithUser, res) => {
    if (!req.user?.token) return res.send({ message: `success ` });
    try {
      const { token } = req.user;

      await this.service.logout(token);
      return res.send({ message: `success ` });
    } catch (e) {
      console.log(e);

      return res.status(500).send({ error: { message: 'Internal server error' } });
    }
  };
}