import { DateFormat } from '@shared/utils/date-format.shared';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { AuthenticationTestModule } from '../../../../test/modules/authentication-test.module';
import { UserTokenInterface } from '@modules/authentication/interfaces';
import { JWT_SECRET_TOKEN } from '@shared/constants/constants';
import { AppError } from '@shared/errors/app.error';
import { HttpStatus } from '@nestjs/common';

describe('AuthenticationService', () => {
  const refreshToken = 'refresh-token';
  const accessToken = 'access-token';

  const user: UserTokenInterface = {
    id: 1,
    name: 'test',
    email: 'test@email.com',
  };

  const userToken = {
    id: 1,
    userId: user.id,
    refreshToken,
    expiresDate: DateFormat.addDays(new Date(), 1),
  };

  let authenticationService: AuthenticationService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthenticationTestModule],
    }).compile();

    authenticationService = moduleRef.get<AuthenticationService>(
      AuthenticationService,
    );

    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('signIn', () => {
    it('should be able to return token response', async () => {
      jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValueOnce(new Promise((resolve) => resolve(accessToken)))
        .mockReturnValueOnce(new Promise((resolve) => resolve(refreshToken)));

      const response = await authenticationService.signIn(user);

      expect(response).toStrictEqual({ accessToken, refreshToken });
    });
  });

  describe('getNewRefreshToken', () => {
    beforeEach(() => {
      jest.spyOn(jwtService, 'decode').mockReturnValue(user);
    });

    it('should be able to get a new refresh token', async () => {
      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockReturnValueOnce(new Promise((resolve) => resolve(null)));

      jest
        .spyOn((authenticationService as any).userTokenRepository, 'findOne')
        .mockReturnValueOnce(
          new Promise((resolve) => resolve(userToken as any)),
        );

      jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValueOnce(new Promise((resolve) => resolve(accessToken)))
        .mockReturnValueOnce(new Promise((resolve) => resolve(refreshToken)));

      const response = await authenticationService.getNewRefreshToken(
        refreshToken,
      );

      expect(response).toStrictEqual({ accessToken, refreshToken });
    });

    it('should not be able to get a invalid token', async () => {
      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockReturnValueOnce(new Promise((_, reject) => reject(null)));

      await expect(
        authenticationService.getNewRefreshToken(refreshToken),
      ).rejects.toThrowError(new AppError(HttpStatus.UNAUTHORIZED));
    });

    it('should not be able to get a token when with invalid refresh token', async () => {
      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockReturnValueOnce(new Promise((resolve) => resolve(null)));

      await expect(
        authenticationService.getNewRefreshToken(refreshToken),
      ).rejects.toThrowError(new AppError(HttpStatus.UNAUTHORIZED));
    });

    it('should not be able to get a token when the token is expired', async () => {
      const expiredUserToken = Object.assign(userToken, {
        expiresDate: DateFormat.addDays(new Date(), -1),
      });

      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockReturnValueOnce(new Promise((resolve) => resolve(null)));

      jest
        .spyOn((authenticationService as any).userTokenRepository, 'findOne')
        .mockReturnValueOnce(
          new Promise((resolve) => resolve(expiredUserToken as any)),
        );

      await expect(
        authenticationService.getNewRefreshToken(refreshToken),
      ).rejects.toThrowError(
        new AppError(HttpStatus.FORBIDDEN, 'Refresh token has expired'),
      );
    });
  });

  describe('verifyToken', () => {
    it('should be able to verify token with default jwt secret', async () => {
      const signSpy = jest.spyOn(jwtService, 'verifyAsync');

      await authenticationService.verifyToken(accessToken);

      expect(signSpy).toHaveBeenCalledWith(accessToken, {
        secret: JWT_SECRET_TOKEN,
      });
    });

    it('should be able to verify token with another jwt secret', async () => {
      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockReturnValueOnce(new Promise((resolve) => resolve(null)));

      const response = await authenticationService.verifyToken(
        accessToken,
        'new-secret',
      );

      expect(response).toBe(true);
    });
  });

  describe('decodeToken', () => {
    it('should be able to decode a token', async () => {
      jest.spyOn(jwtService, 'decode').mockReturnValue(user);

      const response = await authenticationService.decodeToken(accessToken);

      expect(response).toStrictEqual(user);
    });
  });
});
