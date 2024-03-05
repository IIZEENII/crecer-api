import { Repository } from 'typeorm';
import { Product } from '../domain/Product';
import { InjectRepository } from '@nestjs/typeorm';

export class ProductDisabler {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async disable(id: string): Promise<void> {
    this.productRepository.softDelete({ id });
  }
}
