import { Repository, EntityRepository } from 'typeorm';

import { CartProductEntity } from '@modules/cart/entities';

@EntityRepository(CartProductEntity)
export class CartProductRepository extends Repository<CartProductEntity> {}
