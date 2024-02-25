import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../domain/product';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
}
