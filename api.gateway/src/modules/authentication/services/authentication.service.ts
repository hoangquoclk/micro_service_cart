import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IAuthUser } from '@shared/interfaces/auth-user.interface';
import { JWT_SECRET_TOKEN } from '@shared/constants/constants';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(
    token: string,
    secret = JWT_SECRET_TOKEN,
  ): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token, { secret });

      return true;
    } catch (err) {
      return false;
    }
  }

  async decodeToken(token: string): Promise<IAuthUser> {
    return this.jwtService.decode(token) as IAuthUser;
  }
}
