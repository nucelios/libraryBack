import { User } from '@/enteties/User.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';


export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userFactory = factoryManager.get(User);
    await userFactory.save({ username: 'user', password: '123456' });
    await userFactory.save({ username: 'nuceliosUser', password: '123' });
    await userFactory.save({ username: 'admin', password: '123456', role: 'admin' });
    await userFactory.save({ username: 'nucelios', password: '123', role: 'admin' });
  }
}