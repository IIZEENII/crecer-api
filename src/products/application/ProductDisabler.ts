import { Repository } from 'typeorm';
import { Product } from '../domain/Product';
import { InjectRepository } from '@nestjs/typeorm';

export class ProductDisabler {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async disable(product: Product): Promise<void> {
    try {
      await this.productRepository.softRemove(product);
    } catch (error) {
      console.log(error);
    }
  }
}
