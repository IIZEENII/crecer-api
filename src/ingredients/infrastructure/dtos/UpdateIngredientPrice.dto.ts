import { IsNumber, IsPositive } from 'class-validator';

export class UpdateIngredientPriceDto {
  @IsNumber()
  @IsPositive()
  price: number;
}
