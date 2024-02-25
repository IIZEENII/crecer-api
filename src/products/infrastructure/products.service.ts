import { Injectable } from '@nestjs/common';
import { ProductFinder } from '../application/product-finder';
import { Product } from '../domain/product';

@Injectable()
export class ProductsService {
  constructor(private readonly productFinder: ProductFinder) {}

  async findAll(): Promise<Product[]> {
    return this.productFinder.findAll();
  }
}
