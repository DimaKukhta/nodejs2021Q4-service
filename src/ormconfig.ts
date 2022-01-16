import { ConnectionOptions } from 'typeorm';
import path from 'path';
import {
  DB_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRESS_DB,
} from './common/config';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'host.docker.internal',
  port: typeof DB_PORT === 'number' ? DB_PORT : 5432,
  username: POSTGRES_USER || '',
  password: POSTGRES_PASSWORD || '',
  database: POSTGRESS_DB || '',
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, '/**/*.model.ts')],
  subscribers: ['src/subscriber/*.js'],
  migrations: [path.join(__dirname, '/migrations/*.ts')],
  cli: {
    entitiesDir: path.join(__dirname, '/**/*.model.ts'),
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};

export default config;
