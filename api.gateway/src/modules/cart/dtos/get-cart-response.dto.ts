import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
}
