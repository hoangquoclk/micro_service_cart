import { Repository, EntityRepository } from 'typeorm';

import { ProductEntity } from '@modules/product/entities/product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {}
