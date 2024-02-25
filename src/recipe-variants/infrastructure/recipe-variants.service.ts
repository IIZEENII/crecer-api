import { Injectable } from '@nestjs/common';
import { RecipeVariantCreator } from '../application/recipe-variant-creator';
import { CreateRecipeVariantDto } from './dtos/create-recipe-variant.dto';

@Injectable()
export class RecipeVariantsService {
  constructor(private readonly recipeVariantCreator: RecipeVariantCreator) {}

  async create(createRecipeVariantDto: CreateRecipeVariantDto): Promise<void> {
    this.recipeVariantCreator.create(createRecipeVariantDto);
  }
}
