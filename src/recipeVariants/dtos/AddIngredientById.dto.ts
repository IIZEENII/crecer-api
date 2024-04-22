import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class AddIngredientsByIdDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  ingredientIds: string[];
}
