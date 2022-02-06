import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(' ')[1];
    try {
      const isVerify = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      return !!isVerify;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
