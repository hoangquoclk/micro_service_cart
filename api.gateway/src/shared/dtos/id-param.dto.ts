import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class IdParamNumberDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  id: number;
}

export class IdParamStringDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'product-id',
  })
  id: string;
}
