import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationService } from '@modules/authentication/services/authentication.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    if (!headers || !headers.authorization) {
      throw new UnauthorizedException();
    }

    const [, token] = headers.authorization.split(' ');

    if (!token) {
      throw new UnauthorizedException();
    }

    const isValidToken = await this.authenticationService.verifyToken(token);

    if (!isValidToken) {
      throw new UnauthorizedException();
    }

    request.user = await this.authenticationService.decodeToken(token);

    return true;
  }
}
