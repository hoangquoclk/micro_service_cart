import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProductDto } from '@modules/product/dtos/create-product.dto';
import { ProductService } from '@modules/product/services/product.service';
import { ProductDto } from '@modules/product/dtos/product.dto';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { IdParamDto } from '@shared/dtos/id-param.dto';

@ApiSecurity('bearerAuth')
@UseGuards(JwtAuthGuard)
@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiCreatedResponse({ status: HttpStatus.CREATED, type: ProductDto })
  create(@Body() productDto: CreateProductDto) {
    return this.productService.create(productDto);
  }

  @Get()
  @ApiOkResponse({ status: HttpStatus.OK, type: [ProductDto] })
  get() {
    return this.productService.getAll();
  }

  @Get('/:id')
  @ApiOkResponse({ status: HttpStatus.OK, type: ProductDto })
  getById(@Param() { id }: IdParamDto) {
    return this.productService.getById(id);
  }
}
