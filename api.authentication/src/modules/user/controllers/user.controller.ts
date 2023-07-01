import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { IAuthUser } from '@shared/interfaces/auth-user.interface';
import { UserService } from '@modules/user/services/user.service';
import { AuthUser } from '@shared/decorators/auth-user.decorator';
import { RegisterUserDto, LoginDto } from '@modules/user/dtos';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.create(registerUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('bearerAuth')
  delete(@AuthUser() user: IAuthUser) {
    return this.userService.delete(user.email);
  }
}
