import { IsInt, IsPositive } from 'class-validator';

export class UpdateIngredientStockDto {
  @IsInt()
  @IsPositive()
  stock: number;
}
