import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { RedirectService } from '@modules/redirects/services/redirect.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [RedirectService],
  exports: [RedirectService],
})
export class RedirectsModule {}
