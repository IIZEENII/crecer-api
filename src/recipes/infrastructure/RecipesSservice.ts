import { Injectable } from '@nestjs/common';
import { RecipeCreator } from '../application/RecipeCreator';
import { CreateRecipeDto } from './dtos/CreateRecipeDto';
import { RecipeFinder } from '../application/RecipeFinder';
import { Recipe } from '../domain/Recipe';
import { RecipeUpdater } from '../application/RecipeUpdater';
import { UpdateRecipeCategoryDto } from './dtos/UpdateRecipeCategoryDto';

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
