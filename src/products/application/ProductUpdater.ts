import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../domain/Product';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateProductStockDto } from '../infrastructure/dtos/UpdateProductStock.dto';
import { UpdateProductNameDto } from '../infrastructure/dtos/UpdateProductName.dto';
import { UpdateProductPriceDto } from '../infrastructure/dtos/UpdateProductPrice.dto';
import { UpdateProductDescriptionDto } from '../infrastructure/dtos/UpdateProductDescription.dto';

@Injectable()
export class ProductUpdater {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async updateName(id: string, { name }: UpdateProductNameDto) {
    this.productRepository.update(id, { name });
  }

  async updateStock(id: string, { stock }: UpdateProductStockDto) {
    this.productRepository.update(id, { stock });
  }

  async updatePrice(id: string, { price }: UpdateProductPriceDto) {
    this.productRepository.update(id, { price });
  }

  async updateDescription(
    id: string,
    { description }: UpdateProductDescriptionDto,
  ) {
    this.productRepository.update(id, { description });
  }
}
