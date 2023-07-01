import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

import { IProductPayload } from '@modules/product/interfaces/product-payload.interface';
import { ProductService } from '@modules/product/services/product.service';
import { KAFKA_PRODUCT_CREATED_TOPIC } from '@shared/constants';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern(KAFKA_PRODUCT_CREATED_TOPIC)
  async handleProductCreated(@Payload('value') payload: IProductPayload) {
    try {
      const fgGreenColor = '\x1b[32m';
      console.log(
        `${fgGreenColor} started creation of product: ${payload.name}`,
      );

      await this.productService.create(payload);

      console.log(
        `${fgGreenColor} finished creation of product: ${payload.name}`,
      );
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
