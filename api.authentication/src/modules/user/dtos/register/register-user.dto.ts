import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'User name',
  })
  @Expose()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'email@teste.com',
  })
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
  })
  @Expose()
  password: string;
}
