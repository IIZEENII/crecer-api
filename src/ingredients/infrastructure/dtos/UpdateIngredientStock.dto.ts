import { IsInt, Min } from 'class-validator';

export class UpdateIngredientStockDto {
  @IsInt()
  @Min(0)
  stock: number;
}
