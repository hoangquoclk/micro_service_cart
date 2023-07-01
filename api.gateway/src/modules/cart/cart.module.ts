import { Module } from '@nestjs/common';

import { CartController } from '@modules/cart/controllers/cart.controller';
import { RedirectsModule } from '@modules/redirects/redirects.module';

@Module({
  imports: [RedirectsModule],
  controllers: [CartController],
})
export class CartModule {}
