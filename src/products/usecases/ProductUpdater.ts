import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from '../dtos/UpdateProduct.dto';

@Injectable()
export class ProductUpdater {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      await this.productRepository.update(id, updateProductDto);
    } catch (error) {
      console.log(error);
    }
  }
}
