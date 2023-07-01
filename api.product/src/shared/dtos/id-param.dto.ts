import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdParamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'product-id',
  })
  id: string;
}
