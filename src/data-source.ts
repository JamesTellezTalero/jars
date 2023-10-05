import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  username: 'root',
  host: 'localhost',
  database: 'jars',
  password: 'root',
  port: 5432,
  logging: true,
  synchronize: false,
  entities: ['./database/entities/*{.ts,.js}'],
  subscribers: ['./database/subscribers/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['./database/migrations/*{.ts,.js}'],
});
