import app from './app';

import { PORT } from './common/config';

const start = async () => {
  try {
    await app.listen(PORT || 3000);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
