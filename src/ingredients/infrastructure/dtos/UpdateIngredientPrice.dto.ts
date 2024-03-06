import { IsNumber, Min } from 'class-validator';

export class UpdateIngredientPriceDto {
  @IsNumber()
  @Min(0)
  price: number;
}
