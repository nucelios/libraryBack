import { appDataSource } from '@/config/dataSource';
import { UserDto } from '@/dto/User.dto';
import { User } from '@/enteties/User.entity';
import { IUser } from '@/interfaces/IUser';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, appDataSource.createEntityManager());
  }

  async signIn(signInUserDto: UserDto): Promise<string | IUser> {
    const user = await this.findOne({ where: { username: signInUserDto.username } });
    if (!user) throw new Error('User not exist');

    const isMatch = await user.comparePassword(signInUserDto.password);

    if (!isMatch) throw new Error('Login or password is wrong');

    user.generateToken();
    const userWithToken = (await this.save(user)) as unknown as IUser;
    delete userWithToken.password;
    return userWithToken;
  }

  async register(registerUserDto: UserDto): Promise<IUser> {
    const userData = await this.create(registerUserDto);
    userData.generateToken();
    const user = (await this.save(userData)) as unknown as IUser;
    delete user.password;
    return user;
  }
  
  async getUserByToken(token: string){
    return await this.findOneBy({ token });
  }
  async getUserByUsername(username: string): Promise<IUser | null> {
    return await this.findOneBy({ username });
  }
  async clearToken(token: string) {
    const user = await this.getUserByToken(token);
    user?.generateToken();
  }
}