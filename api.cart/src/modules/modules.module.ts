import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { ProductModule } from '@modules/product/product.module';
import { UserModule } from '@modules/user/user.module';
import { CartModule } from '@modules/cart/cart.module';

@Module({
  imports: [ProductModule, UserModule, AuthenticationModule, CartModule],
})
export class ModulesModule {}
