import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super({
      client: {
        clientId: 'config',
        brokers: [configService.get('KAFKA_BROKERS')],
      },
      consumer: {
        groupId:
          process.env.NODE_ENV === 'DEVELOPMENT'
            ? process.env.KAFKA_GROUP_ID + new Date().getMilliseconds()
            : process.env.KAFKA_GROUP_ID,
      },
    });
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.close();
  }
}
