import { HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { DatabaseService } from '@modules/database/services/database.service';
import { CreateProductDto } from '@modules/product/dtos/create-product.dto';
import { KafkaService } from '@modules/message/services/kafka.service';
import { AppError } from '@shared/errors/app.error';

@Injectable()
export class ProductService {
  constructor(
    private readonly databaseService: DatabaseService,

    private readonly kafkaService: KafkaService,
  ) {}

  async create({
    description,
    name,
    price,
  }: CreateProductDto): Promise<Product> {
    const productWithSameName = await this.databaseService.product.findFirst({
      where: {
        name,
      },
    });

    if (productWithSameName) {
      throw new AppError(
        HttpStatus.CONFLICT,
        'Already exists a product with same name',
      );
    }

    const product = await this.databaseService.product.create({
      data: {
        id: uuidv4(),
        name,
        price,
        description,
      },
    });

    this.kafkaService.emit(process.env.KAFKA_PRODUCT_CREATED_TOPIC, {
      key: `product-${product.id}`,
      value: {
        ...product,
      },
    });

    return product;
  }

  async getAll(): Promise<Product[]> {
    return this.databaseService.product.findMany();
  }

  async getById(id: string): Promise<Product> {
    const product = await this.databaseService.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) throw new AppError(HttpStatus.NOT_FOUND, 'Product not found');

    return product;
  }
}
