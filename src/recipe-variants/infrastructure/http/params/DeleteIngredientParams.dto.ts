import { IsUUID } from 'class-validator';

export class DeleteIngredientParams {
  @IsUUID('4')
  id: string;
  @IsUUID('4')
  ingredientId: string;
}
