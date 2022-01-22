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
  logging: true,
  database: POSTGRESS_DB || '',
  synchronize: true,
  entities: [path.join(__dirname, 'resources/**/*.model.ts')],
  // migrationsRun: true,
  // migrations: ['src/migrations/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
};

export default config;
