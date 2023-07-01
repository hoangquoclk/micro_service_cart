import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import {
  JWT_EXPIRES_IN_TOKEN,
  JWT_SECRET_TOKEN,
  USER_TOKEN_REPOSITORY,
} from '@shared/constants/constants';
import { AuthenticationController } from '@modules/authentication/controllers/authentication.controller';
import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { UserToken } from '@modules/user/models/user-token.model';

export const usersTokenProvider = {
  provide: USER_TOKEN_REPOSITORY,
  useValue: UserToken,
};

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_TOKEN,
      signOptions: { expiresIn: JWT_EXPIRES_IN_TOKEN },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, usersTokenProvider],
  exports: [AuthenticationService, usersTokenProvider],
})
export class AuthenticationModule {}
