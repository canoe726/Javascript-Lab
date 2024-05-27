import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin1234!',
  database: 'nest',
  entities: ['/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['/**/migrations/*.js'],
  migrationsTableName: 'migrations',
});
