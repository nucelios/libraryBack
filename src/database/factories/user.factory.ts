import { User } from '@/enteties/User.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';


export const UserFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.username = faker.internet.userName();
  user.password = 'password';
  user.hashPassword();
  user.generateToken();
  return user;
});