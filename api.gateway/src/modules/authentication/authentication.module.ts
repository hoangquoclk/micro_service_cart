import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import {
  JWT_EXPIRES_IN_TOKEN,
  JWT_SECRET_TOKEN,
} from '@shared/constants/constants';
import { AuthenticationService } from '@modules/authentication/services/authentication.service';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_TOKEN,
      signOptions: { expiresIn: JWT_EXPIRES_IN_TOKEN },
    }),
  ],
  controllers: [],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
