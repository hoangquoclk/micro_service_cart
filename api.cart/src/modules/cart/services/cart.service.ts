import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CartRepository,
  CartProductRepository,
} from '@modules/cart/repositories';
import {
  AddProductToCartDto,
  CreateCartDto,
  GetCartResponseDto,
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
  ): Promise<CreateCartDto> {
    const cartUser = await this.userService.findOrCreate(user);

    const foundProduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!foundProduct) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Product not found');
    }

    let cart: CartEntity = null;

    if (cartId) {
      cart = await this.cartRepository.findOne({
        where: { id: cartId, isOpened: true },
      });
    } else {
      cart = await this.cartRepository.findOne({
        where: { userId: cartUser.id, isOpened: true },
      });

      if (!cart) {
        cart = await this.cartRepository.save({
          userId: cartUser.id,
          isOpened: true,
        });
      }
    }

    if (!cart) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Cart not found or its closed');
    }

    const foundCartProduct = await this.cartProductRepository.findOne({
      where: {
        cartId: cart.id,
        productId: foundProduct.id,
      },
    });

    if (foundCartProduct) {
      await this.cartProductRepository.update(
        { cartId: cart.id, productId: foundProduct.id },
        { ...foundCartProduct, quantity },
      );
    } else {
      await this.cartProductRepository.save({
        cartId: cart.id,
        productId: foundProduct.id,
        quantity,
      });
    }

    return CreateCartDto.factory(cart);
  }

  async removeProductFromCart(
    cartId: number,
    user: IAuthUser,
    { productId, quantity }: RemoveProductFromCartDto,
  ) {
    const cartUser = await this.userService.findOrCreate(user);

    const foundCart = await this.cartRepository.findOne({
      where: { id: cartId, userId: cartUser.id, isOpened: true },
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

    if (quantity > foundCartProduct.quantity) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Invalid quantity to remove');
    }

    if (foundCartProduct.quantity === quantity) {
      await this.cartProductRepository.delete({ productId, cartId });
    } else {
      await this.cartProductRepository.update(
        { productId, cartId },
        { ...foundCartProduct, quantity: foundCartProduct.quantity - quantity },
      );
    }
  }

  async getCartById(
    cartId: number,
    user: IAuthUser,
  ): Promise<GetCartResponseDto> {
    const cartUser = await this.userService.findOrCreate(user);

    const foundCart = await this.cartRepository.findOne({
      where: { id: cartId, userId: cartUser.id },
    });

    if (!foundCart) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Cart not found');
    }

    const cartProducts = await this.cartProductRepository.find({
      where: {
        cartId,
      },
      relations: ['product'],
    });

    return GetCartResponseDto.factory(foundCart, cartProducts);
  }
}
