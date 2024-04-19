import { User } from '@/enteties/User.entity';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { UserFactory } from '@/database/factories/user.factory';
import MainSeeder from '@/database/seeds/main.seeder';
import { Library } from '@/enteties/library.entity';



const options: DataSourceOptions & SeederOptions = {

  type: 'mysql',

  host: 'localhost',

  port: 3306,

  username: 'root',

  password: 'root',

  database: 'library',

  synchronize: true,

  logging: true,

  entities: [Library, User],

  seeds: [MainSeeder],

  factories: [UserFactory],

};

export const appDataSource = new DataSource(options);
