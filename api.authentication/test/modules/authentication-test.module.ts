import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { AuthenticationController } from '@modules/authentication/controllers/authentication.controller';
import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { userTokenRepositoryMock } from '../mocks/user-test.repository';
import { USER_TOKEN_REPOSITORY } from '@shared/constants/constants';
import { jwtServiceMock } from '../mocks/jwt-test.service';

const usersTokenProvider = {
  provide: USER_TOKEN_REPOSITORY,
  useValue: userTokenRepositoryMock,
};

const jwtServiceProvider = {
  provide: JwtService,
  useValue: jwtServiceMock,
};

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, jwtServiceProvider, usersTokenProvider],
  exports: [AuthenticationService, jwtServiceProvider, usersTokenProvider],
})
export class AuthenticationTestModule {}
