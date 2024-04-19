
import { IUser } from '@/interfaces/IUser';
import { RequestWithUser } from '@/interfaces/Request.interface';
import { UserService } from '@/service/user.service';
import { RequestHandler } from 'express';
const authService = new UserService();
export let curUser: IUser | null

export const authValidate: RequestHandler = async (req: RequestWithUser, res, next) => {

  try {

    const token = req.header('Authorization');

    if (!token) {

      return res.status(401).send({ error: { message: 'No token present' } });

    }

    const user = await authService.getUserByToken(token);
    curUser = user
    if (!user) return res.status(401).send({ error: { message: 'Wrong token' } });

    req.user = user;

    return next();

  } catch (e) {

    return res.status(500).send({ error: { message: 'Internal server error' } });

  }

};