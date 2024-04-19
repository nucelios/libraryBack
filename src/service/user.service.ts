import { UserDto } from "@/dto/User.dto";
import { IUser } from "@/interfaces/IUser";
import { UserRepository } from "@/repositories/User.repo";


export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  sigIn = async (singInUserDto: UserDto): Promise<IUser | string> => {
    return await this.repository.signIn(singInUserDto);
  };

  register = async (registerUSerDto: UserDto): Promise<IUser> => {
    return await this.repository.register(registerUSerDto);
  };

  getUserByToken = async (token: string): Promise<IUser | null> => {
    return await this.repository.getUserByToken(token);
  };
  async logout(token: string): Promise<void> {
    await this.repository.clearToken(token);
  }
}
