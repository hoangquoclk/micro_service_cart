import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  userId: number;

  @ApiProperty({
    example: true,
  })
  isOpened: boolean;
}
