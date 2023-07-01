import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { UserController } from '@modules/user/controllers/user.controller';
import { UserService } from '@modules/user/services/user.service';
import { USER_REPOSITORY } from '@shared/constants/constants';
import { User } from '@modules/user/models/user.model';

export const usersProvider = {
  provide: USER_REPOSITORY,
  useValue: User,
};

@Module({
  imports: [AuthenticationModule],
  controllers: [UserController],
  providers: [UserService, usersProvider],
  exports: [UserService, usersProvider],
})
export class UserModule {}
