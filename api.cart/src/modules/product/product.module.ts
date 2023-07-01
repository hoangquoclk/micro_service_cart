import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ProductRepository } from '@modules/product/repositories/product.repository';
import { ProductService } from '@modules/product/services/product.service';

const loadRepositories = TypeOrmModule.forFeature([ProductRepository]);

@Module({
  imports: [loadRepositories],
  controllers: [],
  providers: [ProductService],
  exports: [ProductService, loadRepositories],
})
export class ProductModule {}
