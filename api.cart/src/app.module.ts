import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ModulesModule } from '@modules/modules.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '@configs/typeorm/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => config,
    }),
    ModulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
