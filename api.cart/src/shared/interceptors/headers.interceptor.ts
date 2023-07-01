import { CanActivate, ExecutionContext } from '@nestjs/common';

import { HeaderDto } from '@shared/dtos/header.dto';

export class HeadersInterceptor implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const reqType = context.getType();

    if (reqType === 'http') {
      const req = context.switchToHttp().getRequest();

      HeaderDto.factory(req.headers);
    }

    return true;
  }
}
