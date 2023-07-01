import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IProductPayload } from '@modules/product/interfaces/product-payload.interface';
import { ProductRepository } from '@modules/product/repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async create({ name, price }: IProductPayload) {
    return this.productRepository.save({
      name,
      price,
    });
  }
}
