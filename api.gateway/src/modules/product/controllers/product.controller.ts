import {
  Body,
  Controller,
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

import { RedirectService } from '@modules/redirects/services/redirect.service';
import { CreateProductDto, ProductDto } from '@modules/product/dtos';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { IdParamStringDto } from '@shared/dtos/id-param.dto';

@Controller('products')
@ApiTags('products')
@ApiSecurity('bearerAuth')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly redirectService: RedirectService) {}

  @Post()
  @ApiCreatedResponse({ status: HttpStatus.CREATED, type: ProductDto })
  create(@Req() request: Request, @Body() productDto: CreateProductDto) {
    return this.redirectService.redirect(
      request,
      `${process.env.API_PRODUCT_URL}/products`,
    );
  }

  @Get()
  @ApiOkResponse({ status: HttpStatus.OK, type: [ProductDto] })
  getAll(@Req() request: Request) {
    return this.redirectService.redirect(
      request,
      `${process.env.API_PRODUCT_URL}/products`,
    );
  }

  @Get('/:id')
  @ApiOkResponse({ status: HttpStatus.OK, type: ProductDto })
  getById(@Req() request: Request, @Param() { id }: IdParamStringDto) {
    return this.redirectService.redirect(
      request,
      `${process.env.API_PRODUCT_URL}/products/${id}`,
    );
  }
}
