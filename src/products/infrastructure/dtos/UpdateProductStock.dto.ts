import { IsNumber, Min } from 'class-validator';

export class UpdateProductStockDto {
  @IsNumber()
  @Min(0)
  stock: number;
}
