import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    example: 'product-id',
  })
  id: string;

  @ApiProperty({
    example: 'product name',
  })
  name: string;

  @ApiProperty({
    example: 1,
  })
  price: number;

  @ApiProperty({
    example: 'product description',
  })
  description: string;
}
