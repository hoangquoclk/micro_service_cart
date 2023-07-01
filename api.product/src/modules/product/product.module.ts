import { Module } from '@nestjs/common';

import { ProductController } from '@modules/product/controllers/product.controller';
import { ProductService } from '@modules/product/services/product.service';
import { MessageModule } from '@modules/message/message.module';

@Module({
  imports: [MessageModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
