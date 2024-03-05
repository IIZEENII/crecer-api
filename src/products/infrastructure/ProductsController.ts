import { Controller, Get } from '@nestjs/common';
import { Product } from '../domain/Product';
import { ProductFinder } from '../application/ProductFinder';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsFinder: ProductFinder) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsFinder.findAll();
  }
}
