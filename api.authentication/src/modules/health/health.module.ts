import { Module } from '@nestjs/common';

import { HealthController } from '@modules/health/controllers/health.controller';

@Module({
  imports: [],
  controllers: [HealthController],
})
export class HealthModule {}
