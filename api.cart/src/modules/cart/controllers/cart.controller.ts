import {
  Controller,
  Delete,
  Get,
  Post,
  Headers,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  AddProductToCartDto,
  RemoveProductFromCartDto,
} from '@modules/cart/dtos';
import { CartService } from '@modules/cart/services/cart.service';
import { IdParamDto } from '@shared/dtos/id-param.dto';
import { HeaderDto } from '@shared/dtos/header.dto';

@Controller('carts')
@ApiTags('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addProductToCart(
    @Headers() headers: HeaderDto,
    @Body() cartDto: AddProductToCartDto,
  ) {
    return this.cartService.addProductToCart(headers.user, cartDto);
  }

  @Delete('/:id')
  removeProductFromCart(
    @Param() { id }: IdParamDto,
    @Headers() headers: HeaderDto,
    @Body() removeDto: RemoveProductFromCartDto,
  ) {
    return this.cartService.removeProductFromCart(id, headers.user, removeDto);
  }

  @Get()
  getCartById() {
    //
  }
}
