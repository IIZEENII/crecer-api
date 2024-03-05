import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/RecipeVariant';
import { Repository } from 'typeorm';
import { AddIngredientsByIdDto } from '../infrastructure/dtos/AddIngredientById.dto';

export class IngredientAgregatorToRecipeVariant {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async add(
    id: string,
    addIngredientsByIdDto: AddIngredientsByIdDto,
  ): Promise<void> {
    console.log(id, addIngredientsByIdDto.ingredientIds);
  }
}
