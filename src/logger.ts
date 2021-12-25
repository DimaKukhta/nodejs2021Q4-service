import pino, { Logger } from 'pino';
import { LOGGING_LEVEL } from './common/config';

const logLevels = ['trace', 'debug', 'info', 'warn', 'error'];

const logLevel =
  LOGGING_LEVEL === 'all' ||
  !LOGGING_LEVEL ||
  !logLevels.includes(LOGGING_LEVEL)
    ? 'trace'
    : LOGGING_LEVEL;

const logger: Logger = pino({
  level: logLevel,
  transport: {
    targets: [
      {
        target: 'pino/file',
        level: 'trace',
        options: { destination: './logs/all.txt', mkdir: true },
      },
      {
        target: 'pino/file',
        level: 'error',
        options: { destination: './logs/error.txt', mkdir: true },
      },
      {
        target: 'pino-pretty',
        level: 'trace',
        options: {
          colorize: true,
        },
      },
    ],
  },
  serializers: {
    req (request) {
      return { url: request.url, reqestParams: request.params }
    }
  }
});

export default logger;
