import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CartEntity, CartProductEntity } from '@modules/cart/entities';

class GetCartProductResponseDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  productId: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 'product name',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 10.0,
  })
  price: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  quantity: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 10.0,
  })
  totalPrice: number;
}

export class GetCartResponseDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  cartId: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 50.2,
  })
  totalPrice: number;

  @IsNotEmpty()
  @ApiProperty({
    type: [GetCartProductResponseDto],
  })
  products: GetCartProductResponseDto[];

  static factory(
    cart: CartEntity,
    cartProducts: CartProductEntity[],
  ): GetCartResponseDto {
    let amount = 0;

    const products: GetCartProductResponseDto[] =
      cartProducts.map((cartProduct) => {
        const totalPrice = cartProduct.quantity * cartProduct.product.price;

        amount += totalPrice;

        return {
          productId: cartProduct.productId,
          name: cartProduct.product.name,
          price: cartProduct.product.price,
          quantity: cartProduct.quantity,
          totalPrice,
        };
      }) || [];

    const dto: GetCartResponseDto = {
      cartId: cart.id,
      userId: cart.userId,
      totalPrice: amount,
      products,
    };

    return dto;
  }
}
