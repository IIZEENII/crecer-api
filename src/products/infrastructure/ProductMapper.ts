import { Category } from '@src/shared/domain/Category';
import { Product } from '../domain/Product';
import { ProductDto } from './dtos/Product.dto';

export class ProductMapper {
  to(product: Product): ProductDto {
    return {
      ...product,
      category: Category.BREADS,
    };
  }
}
