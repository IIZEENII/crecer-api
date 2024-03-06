import { IsString, Length } from 'class-validator';

export class UpdateIngredientNameDto {
  @IsString()
  @Length(1, 64)
  name: string;
}
