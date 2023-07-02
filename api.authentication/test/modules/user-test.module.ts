import { CACHE_MANAGER, Module } from '@nestjs/common';

import { UserController } from '@modules/user/controllers/user.controller';
import { AuthenticationTestModule } from './authentication-test.module';
import { userRepositoryMock } from '../mocks/user-test.repository';
import { UserService } from '@modules/user/services/user.service';
import { USER_REPOSITORY } from '@shared/constants/constants';

const usersTokenProvider = {
  provide: USER_REPOSITORY,
  useValue: userRepositoryMock,
};

const cacheProvider = {
  provide: CACHE_MANAGER,
  useValue: {
    get: () => jest.fn(),
    set: () => jest.fn(),
    del: () => jest.fn(),
  },
};

@Module({
  imports: [AuthenticationTestModule],
  controllers: [UserController],
  providers: [UserService, usersTokenProvider, cacheProvider],
})
export class UserTestModule {}
