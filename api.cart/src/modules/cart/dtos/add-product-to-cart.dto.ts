import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddProductToCartDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  quantity: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  cartId?: number;
}
