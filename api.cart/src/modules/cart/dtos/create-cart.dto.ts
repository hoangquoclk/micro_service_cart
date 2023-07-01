import { ApiProperty } from '@nestjs/swagger';

import { CartEntity } from '@modules/cart/entities';

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

  static factory({ id, isOpened, userId }: CartEntity): CreateCartDto {
    return {
      id,
      isOpened,
      userId,
    };
  }
}
