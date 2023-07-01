import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
  CartRepository,
  CartProductRepository,
} from '@modules/cart/repositories';
import { ProductRepository } from '@modules/product/repositories/product.repository';
import { CartController } from '@modules/cart/controllers/cart.controller';
import { CartService } from '@modules/cart/services/cart.service';
import { UserModule } from '@modules/user/user.module';

const loadRepositories = TypeOrmModule.forFeature([
  CartRepository,
  CartProductRepository,
  ProductRepository,
]);

@Module({
  imports: [UserModule, loadRepositories],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService, loadRepositories],
})
export class CartModule {}
