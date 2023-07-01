import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '@modules/database/database.module';
import { ModulesModule } from '@modules/modules.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ModulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
