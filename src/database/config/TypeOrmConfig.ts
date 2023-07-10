import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'inventory',
  synchronize: true,
  logging: true,
  entities: [
    'dist/**/*.entity{.ts,.js}',
    'dist/**/data/models/*Entity{.ts,.js}',
  ],
  subscribers: [],
  migrations: [],
});
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
