import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CartRepository,
  CartProductRepository,
} from '@modules/cart/repositories';
import {
  AddProductToCartDto,
  RemoveProductFromCartDto,
} from '@modules/cart/dtos';
import { ProductRepository } from '@modules/product/repositories/product.repository';
import { IAuthUser } from '@shared/interfaces/auth-user.interface';
import { UserService } from '@modules/user/services/user.service';
import { CartEntity } from '@modules/cart/entities/cart.entity';
import { AppError } from '@shared/errors/app.error';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartRepository)
    private readonly cartRepository: CartRepository,

    @InjectRepository(CartProductRepository)
    private readonly cartProductRepository: CartProductRepository,

    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,

    private readonly userService: UserService,
  ) {}

  async addProductToCart(
    user: IAuthUser,
    { productId, cartId, quantity }: AddProductToCartDto,
  ) {
    const userId = user.sub;

    await this.userService.findOrCreate(user);

    const foundProduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!foundProduct) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Product not found');
    }

    let cart: CartEntity = null;

    if (!cartId) {
      cart = await this.cartRepository.save({
        userId,
      });
    } else {
      cart = await this.cartRepository.findOne({ where: { id: cartId } });
    }

    if (!cart) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Cart not found');
    }

    await this.cartProductRepository.save({
      cartId: cart.id,
      productId: foundProduct.id,
      quantity,
    });
  }

  async removeProductFromCart(
    cartId: number,
    user: IAuthUser,
    { productId, quantity }: RemoveProductFromCartDto,
  ) {
    const userId = user.sub;

    const foundCart = await this.cartRepository.findOne({
      where: { id: cartId, userId },
    });

    if (!foundCart) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Cart not found');
    }

    const foundProduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!foundProduct) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Product not found');
    }

    const foundCartProduct = await this.cartProductRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });

    if (!foundCartProduct) {
      throw new AppError(
        HttpStatus.NOT_FOUND,
        'There are no products to remove from this cart',
      );
    }

    if (foundCartProduct.quantity === quantity) {
      await this.cartProductRepository.delete({ productId, cartId });
    } else {
      await this.cartProductRepository.update(
        { productId, cartId },
        { ...foundCartProduct, quantity },
      );
    }
  }
}
