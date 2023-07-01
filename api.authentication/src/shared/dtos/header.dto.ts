import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class HeaderDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    required: true,
  })
  authorization: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    required: true,
  })
  refreshToken: string;

  static factory(data: HeaderDto) {
    const refreshToken =
      data['refresh-token'] || data['refreshToken'] || data['refreshtoken'];
    const authorization = data['x-access-token'] || data['authorization'];

    if (refreshToken) {
      data.refreshToken = refreshToken;
    }

    if (authorization) {
      data.authorization = authorization;
    }

    return plainToInstance(HeaderDto, data, { excludeExtraneousValues: true });
  }
}
