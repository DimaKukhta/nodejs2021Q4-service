/* eslint-disable node/no-missing-import */
import app from './app';

import { PORT } from './common/config';

const start = async () => {
  try {
    await app.listen(PORT || 4000);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
