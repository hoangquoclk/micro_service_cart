// TO DO: add supertest

import { Test } from '@nestjs/testing';

import { AuthenticationController } from '@modules/authentication/controllers/authentication.controller';
import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { AuthenticationTestModule } from '../../../../test/modules/authentication-test.module';
import { ITokenResponse } from '@modules/authentication/interfaces';
import { HeaderDto } from '@shared/dtos/header.dto';

describe('Authentication Controller', () => {
  const headers: HeaderDto = {
    authorization: 'authorization',
    refreshToken: 'refreshToken',
  };

  let authenticationController: AuthenticationController;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthenticationTestModule],
    }).compile();

    authenticationController = moduleRef.get<AuthenticationController>(
      AuthenticationController,
    );

    authenticationService = moduleRef.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  describe('refreshToken', () => {
    it('should be able to get a new refresh token', async () => {
      const response: ITokenResponse = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };

      jest
        .spyOn(authenticationService, 'getNewRefreshToken')
        .mockImplementation(async () => response);

      expect(await authenticationController.refreshToken(headers)).toBe(
        response,
      );
    });
  });
});
