import { CacheModule, Module } from '@nestjs/common';

import { ModulesModule } from '@modules/modules.module';

@Module({
  imports: [CacheModule.register({ isGlobal: true }), ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
