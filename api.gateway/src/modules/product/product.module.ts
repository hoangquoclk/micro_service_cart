import { Module } from '@nestjs/common';

import { ProductController } from '@modules/product/controllers/product.controller';
import { RedirectsModule } from '@modules/redirects/redirects.module';

@Module({
  imports: [RedirectsModule],
  controllers: [ProductController],
})
export class ProductModule {}
