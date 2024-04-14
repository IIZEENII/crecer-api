import { Category } from '@src/shared/domain/Category';

export class ProductDto {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: Category;
}
