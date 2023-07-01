import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { HeadersInterceptor } from '@shared/interceptors/headers.interceptor';
import { HeaderDto } from '@shared/dtos/header.dto';

@Controller('authentication')
@ApiTags('authentication')
@UseGuards(HeadersInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('/refresh-token')
  refreshToken(@Headers() headers: HeaderDto) {
    return this.authenticationService.getNewRefreshToken(headers.refreshToken);
  }
}
