import { All, Controller, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { RedirectService } from '@modules/redirects/services/redirect.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { UrlUtils } from '@shared/utils/url-utils';

@Controller(process.env.API_CART_PREFIX)
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly redirectService: RedirectService) {}

  @All('*')
  async allRoutes(@Req() request: Request) {
    return this.redirect(request);
  }

  private async redirect(@Req() request: Request) {
    const url = UrlUtils.getUrl(
      request,
      process.env.CARS_URL,
      process.env.RENTAL_API_PREFIX,
    );

    return this.redirectService.redirect(request, url);
  }
}
