import { Category } from '@src/shared/enums/Category';

export class ProductDto {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: Category;
}
