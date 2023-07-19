import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'shopping_mall',
  synchronize: true,
  logging: true,
  connectTimeout: 60000,
  entities: [
    'dist/**/*.entity{.ts,.js}',
    'dist/**/data/models/*Entity{.ts,.js}',
  ],
  subscribers: [],
  migrations: [],
});
