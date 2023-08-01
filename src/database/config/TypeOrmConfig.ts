import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'shopping_mall',
  synchronize: true,
  logging: true,
  entities: [
    'dist/**/*.entity{.ts,.js}',
    'dist/**/data/models/*Entity{.ts,.js}',
  ],
  subscribers: [],
  migrations: ['dist/database/migrations/*.{.ts,.js}'],
  migrationsTableName: 'migrations_history',
  migrationsRun: true,
});
