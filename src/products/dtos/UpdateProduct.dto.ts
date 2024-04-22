import { IsNumber, Length, Min } from 'class-validator';

export class UpdateProductDto {
  @Length(1, 32)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @Length(0, 255)
  description: string;
}
