import { Module } from '@nestjs/common';

import { KafkaService } from '@modules/message/services/kafka.service';

@Module({
  imports: [],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class MessageModule {}
