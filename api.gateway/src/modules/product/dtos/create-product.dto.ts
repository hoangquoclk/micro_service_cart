import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'product name',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 10.5,
  })
  price: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 'product description',
  })
  description: string;
}
