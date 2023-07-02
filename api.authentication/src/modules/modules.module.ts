import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { DatabaseModule } from '@modules/database/database.module';
import { HealthModule } from '@modules/health/health.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [DatabaseModule, HealthModule, AuthenticationModule, UserModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
