import {
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Entity,
} from 'typeorm';

import { ProductEntity } from '@modules/product/entities/product.entity';
import { CartEntity } from '@modules/cart/entities/cart.entity';

@Entity('cart_product')
export class CartProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'cart_id' })
  cartId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
  })
  product: ProductEntity;

  @ManyToOne(() => CartEntity)
  @JoinColumn({
    name: 'cart_id',
  })
  cart: CartEntity;
}
