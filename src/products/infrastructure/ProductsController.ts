import { Controller, Get } from '@nestjs/common';
import { Product } from '../domain/Product';
import { ProductFinder } from '../application/ProductFinder';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsFinder: ProductFinder) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsFinder.findAll();
  }
}
