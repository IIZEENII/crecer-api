import { Injectable } from '@nestjs/common';
import { RecipeCreator } from '../application/RecipeCreator';
import { CreateRecipeDto } from './dtos/CreateRecipe.dto';
import { RecipeFinder } from '../application/RecipeFinder';
import { Recipe } from '../domain/Recipe';
import { RecipeCategoryUpdater } from '../application/RecipeCategoryUpdater';
import { UpdateRecipeCategoryDto } from './dtos/UpdateRecipeCategory.dto';

@Injectable()
export class RecipesService {
  constructor(
    private readonly recipeCreator: RecipeCreator,
    private readonly recipeFinder: RecipeFinder,
    private readonly recipeCategoryUpdater: RecipeCategoryUpdater,
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
    this.recipeCategoryUpdater.update(id, updateRecipeDto);
  }
}
