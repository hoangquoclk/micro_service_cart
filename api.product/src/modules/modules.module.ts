import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { MessageModule } from '@modules/message/message.module';
import { ProductModule } from '@modules/product/product.module';

@Module({
  imports: [AuthenticationModule, MessageModule, ProductModule],
})
export class ModulesModule {}
