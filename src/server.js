const { PORT } = require('./common/config');
const app = require('./app');

const start = async () => {
  try {
    await app.listen(PORT);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
