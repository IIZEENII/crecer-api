import { IsUUID } from 'class-validator';

export class RemoveIngredientParams {
  @IsUUID('4')
  id: string;
  @IsUUID('4')
  ingredientId: string;
}
