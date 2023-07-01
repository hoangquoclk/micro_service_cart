import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserRepository } from '@modules/user/repositories/user.repository';
import { UserService } from '@modules/user/services/user.service';

const loadRepositories = TypeOrmModule.forFeature([UserRepository]);

@Module({
  imports: [loadRepositories],
  providers: [UserService],
  exports: [UserService, loadRepositories],
})
export class UserModule {}
