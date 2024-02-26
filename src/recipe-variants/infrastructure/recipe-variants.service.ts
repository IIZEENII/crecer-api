import { Injectable } from '@nestjs/common';
import { RecipeVariantCreator } from '../application/recipe-variant-creator';
import { CreateRecipeVariantDto } from './dtos/create-recipe-variant.dto';
import { RecipeVariantCloner } from '../application/recipe-variant-cloner';
import { CreateRecipeVariantCloneDto } from './dtos/create-clone-recipe-variant.dto';

@Injectable()
export class RecipeVariantsService {
  constructor(
    private readonly recipeVariantCreator: RecipeVariantCreator,
    private readonly recipeVariantCloner: RecipeVariantCloner,
  ) {}

  async create(createRecipeVariantDto: CreateRecipeVariantDto): Promise<void> {
    this.recipeVariantCreator.create(createRecipeVariantDto);
  }

  async clone(
    idOfVariantToClone: string,
    cloneRecipeVariantDto: CreateRecipeVariantCloneDto,
  ): Promise<void> {
    this.recipeVariantCloner.clone(idOfVariantToClone, cloneRecipeVariantDto);
  }
}
