import 'reflect-metadata';
import { createConnection } from 'typeorm';
import ormconfig from './ormconfig';
import app from './app';
import { PORT } from './common/config';

createConnection(ormconfig)
  .then(async () => {
    try {
      await app.listen(PORT || 4000, '0.0.0.0');
    } catch (e) {
      app.log.error(e);
      process.exit(1);
    }
  })
  .catch((error) => app.log.error(error));
