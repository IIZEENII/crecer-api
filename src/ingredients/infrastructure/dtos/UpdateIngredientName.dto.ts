import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateIngredientNameDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
