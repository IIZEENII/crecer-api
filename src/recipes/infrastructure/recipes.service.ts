import { Injectable } from '@nestjs/common';
import { RecipeCreator } from '../application/recipe-creator';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RecipeFinder } from '../application/recipe-finder';
import { Recipe } from '../domain/recipe';
import { RecipeUpdater } from '../application/recipe-updater';
import { UpdateRecipeCategoryDto } from './dtos/update-recipe-category.dto';

@Injectable()
export class RecipesService {
  constructor(
    private readonly recipeCreator: RecipeCreator,
    private readonly recipeFinder: RecipeFinder,
    private readonly recipeUpdater: RecipeUpdater,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<void> {
    this.recipeCreator.create(createRecipeDto);
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeFinder.findAll();
  }

  async findById(id: string): Promise<Recipe> {
    return this.recipeFinder.findById(id);
  }

  async updateCategory(
    id: string,
    updateRecipeDto: UpdateRecipeCategoryDto,
  ): Promise<void> {
    const recipe = await this.recipeFinder.findById(id);
    this.recipeUpdater.updateCategory(recipe, updateRecipeDto);
  }
}
