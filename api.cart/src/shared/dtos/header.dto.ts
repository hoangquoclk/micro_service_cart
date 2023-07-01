import { IAuthUser } from '@shared/interfaces/auth-user.interface';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class HeaderDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  authorization: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  refreshToken: string;

  @IsObject()
  @Expose()
  user: IAuthUser;

  static factory(data: HeaderDto) {
    const refreshToken =
      data['refresh-token'] || data['refreshToken'] || data['refreshtoken'];

    const authorization = data['x-access-token'] || data['authorization'];

    const user = data['user'] as any as string;

    if (refreshToken) {
      data.refreshToken = refreshToken;
    }

    if (authorization) {
      data.authorization = authorization;
    }

    if (user) {
      data.user = JSON.parse(user);
    }

    return plainToInstance(HeaderDto, data, { excludeExtraneousValues: true });
  }
}
