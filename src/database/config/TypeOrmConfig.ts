import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";

export const TypeOrmConfig: TypeOrmModuleOptions =
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "",
  "database": "shopping_mall",
  "entities": [
    "dist/**/*.entity{.ts,.js}",
    "dist/**/data/models/*Entity{.ts,.js}"
  ],
  "synchronize": true,
  "logging": true
};
