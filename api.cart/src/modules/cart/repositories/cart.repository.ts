import { Repository, EntityRepository } from 'typeorm';

import { CartEntity } from '@modules/cart/entities/cart.entity';

@EntityRepository(CartEntity)
export class CartRepository extends Repository<CartEntity> {}
