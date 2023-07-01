import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IAuthUser } from '@shared/interfaces/auth-user.interface';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IAuthUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
