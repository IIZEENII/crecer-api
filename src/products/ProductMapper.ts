import { Category } from '@src/shared/enums/Category';
import { Product } from './entities/product';
import { ProductDto } from './dtos/Product.dto';

export class ProductMapper {
  to(product: Product): ProductDto {
    return {
      ...product,
      category: Category.BREADS,
    };
  }
}
