import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  JWT_EXPIRES_IN_REFRESH_TOKEN,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_SECRET_TOKEN,
  USER_TOKEN_REPOSITORY,
} from '@shared/constants/constants';
import {
  IPayloadInterface,
  ITokenResponse,
  UserTokenInterface,
} from '@modules/authentication/interfaces';
import { IAuthUser } from '@shared/interfaces/auth-user.interface';
import { UserToken } from '@modules/user/models/user-token.model';
import { DateFormat } from '@shared/utils/date-format.shared';
import { AppError } from '@shared/errors/app.error';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(USER_TOKEN_REPOSITORY)
    private readonly userTokenRepository: typeof UserToken,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: UserTokenInterface): Promise<ITokenResponse> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    await this.saveToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async getNewRefreshToken(refreshToken: string): Promise<ITokenResponse> {
    const isValid = await this.verifyToken(
      refreshToken,
      JWT_SECRET_REFRESH_TOKEN,
    );

    if (!isValid) {
      throw new AppError(HttpStatus.UNAUTHORIZED);
    }

    const decodedToken = await this.decodeToken(refreshToken);

    const userId = decodedToken.sub;

    const userToken = await this.userTokenRepository.findOne({
      where: { userId, refreshToken },
    });

    if (!userToken) {
      throw new AppError(HttpStatus.UNAUTHORIZED);
    }

    if (DateFormat.isExpired(userToken.expiresDate)) {
      throw new AppError(HttpStatus.FORBIDDEN, 'Refresh token has expired');
    }

    await this.deleteTokenByUserId(userId);

    const { accessToken, refreshToken: newRefreshToken } = await this.signIn({
      id: userId,
      name: decodedToken.name,
      email: decodedToken.email,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

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

  private async deleteTokenByUserId(userId: number) {
    await this.userTokenRepository.destroy({ where: { userId } });
  }

  private async saveToken(userId: number, refreshToken: string) {
    await this.deleteTokenByUserId(userId);

    await this.userTokenRepository.create({
      userId,
      refreshToken,
      expiresDate: DateFormat.addDays(
        new Date(),
        parseInt(JWT_EXPIRES_IN_REFRESH_TOKEN),
      ),
    });
  }

  private async generateAccessToken(user: UserTokenInterface): Promise<string> {
    const payload: IPayloadInterface = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    return this.jwtService.signAsync(payload);
  }

  private async generateRefreshToken(
    user: UserTokenInterface,
  ): Promise<string> {
    const payload: IPayloadInterface = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: JWT_EXPIRES_IN_REFRESH_TOKEN,
      secret: JWT_SECRET_REFRESH_TOKEN,
    });
  }
}
