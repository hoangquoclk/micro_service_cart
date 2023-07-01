import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CartProductEntity } from '@modules/cart/entities/cart-product.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { BaseEntity } from '@shared/base/base.entity';

@Entity('carts')
export class CartEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'is_opened' })
  isOpened: boolean;

  @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.cart)
  cartProducts: CartProductEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
