import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ProductRepository } from '@modules/product/repositories/product.repository';
import { ProductController } from '@modules/product/controllers/product.controller';
import { ProductService } from '@modules/product/services/product.service';

const loadRepositories = TypeOrmModule.forFeature([ProductRepository]);

@Module({
  imports: [loadRepositories],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, loadRepositories],
})
export class ProductModule {}
