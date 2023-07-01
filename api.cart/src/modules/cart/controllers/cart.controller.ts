import {
  Controller,
  Delete,
  Get,
  Post,
  Headers,
  Body,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import {
  AddProductToCartDto,
  CreateCartDto,
  GetCartResponseDto,
  RemoveProductFromCartDto,
} from '@modules/cart/dtos';
import { CartService } from '@modules/cart/services/cart.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { IdParamDto } from '@shared/dtos/id-param.dto';
import { HeaderDto } from '@shared/dtos/header.dto';

@ApiSecurity('bearerAuth')
@UseGuards(JwtAuthGuard)
@Controller('carts')
@ApiTags('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiCreatedResponse({ status: HttpStatus.CREATED, type: CreateCartDto })
  addProductToCart(
    @Headers() headers: HeaderDto,
    @Body() cartDto: AddProductToCartDto,
  ) {
    return this.cartService.addProductToCart(headers.user, cartDto);
  }

  @Delete('/:id')
  @ApiOkResponse({ status: HttpStatus.OK })
  removeProductFromCart(
    @Param() { id }: IdParamDto,
    @Headers() headers: HeaderDto,
    @Body() removeDto: RemoveProductFromCartDto,
  ) {
    return this.cartService.removeProductFromCart(id, headers.user, removeDto);
  }

  @Get('/:id')
  @ApiOkResponse({ status: HttpStatus.OK, type: GetCartResponseDto })
  getCartById(@Param() { id }: IdParamDto, @Headers() headers: HeaderDto) {
    return this.cartService.getCartById(id, headers.user);
  }
}
