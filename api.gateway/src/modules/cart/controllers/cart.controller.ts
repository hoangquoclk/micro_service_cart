import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import {
  AddProductToCartDto,
  CreateCartDto,
  GetCartResponseDto,
  RemoveProductFromCartDto,
} from '@modules/cart/dtos';
import { RedirectService } from '@modules/redirects/services/redirect.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { IdParamNumberDto } from '@shared/dtos/id-param.dto';

@Controller('carts')
@ApiTags('carts')
@ApiSecurity('bearerAuth')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly redirectService: RedirectService) {}

  @Post()
  @ApiCreatedResponse({ status: HttpStatus.CREATED, type: CreateCartDto })
  addProductToCart(@Req() request: Request, @Body() body: AddProductToCartDto) {
    return this.redirectService.redirect(
      request,
      `${process.env.API_CART_URL}/carts`,
    );
  }

  @Delete('/:id')
  @ApiOkResponse({ status: HttpStatus.OK })
  remoteProductFromCart(
    @Req() request: Request,
    @Param() { id }: IdParamNumberDto,
    @Body() removeDto: RemoveProductFromCartDto,
  ) {
    return this.redirectService.redirect(
      request,
      `${process.env.API_CART_URL}/carts/${id}`,
    );
  }

  @Get('/:id')
  @ApiOkResponse({ status: HttpStatus.OK, type: GetCartResponseDto })
  getCartById(@Req() request: Request, @Param() { id }: IdParamNumberDto) {
    return this.redirectService.redirect(
      request,
      `${process.env.API_CART_URL}/carts/${id}`,
    );
  }
}
