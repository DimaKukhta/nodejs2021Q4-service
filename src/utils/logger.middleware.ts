import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body, params, query } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(
        `
        Request data:
        Method: ${method}
        URL: ${originalUrl}
        Code: ${statusCode}
        Body: ${JSON.stringify(body)}
        Params: ${JSON.stringify(params)}
        Query: ${JSON.stringify(query)}
        From: ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
