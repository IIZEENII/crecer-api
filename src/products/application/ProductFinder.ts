import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../domain/Product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductFinder {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findById(id: string): Promise<Product> {
    const productFound = await this.productRepository.findOneBy({ id });
    if (!productFound) {
      throw new NotFoundException('product not found');
    }
    return productFound;
  }
}
