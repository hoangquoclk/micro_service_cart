import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { ProductModule } from '@modules/product/product.module';
import { HealthModule } from '@modules/health/health.module';
import { CartModule } from '@modules/cart/cart.module';

@Module({
  imports: [AuthenticationModule, CartModule, ProductModule, HealthModule],
})
export class ModulesModule {}
