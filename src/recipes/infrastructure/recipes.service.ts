import { Injectable } from '@nestjs/common';
import { RecipeCreator } from '../application/recipe-creator';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RecipeFinder } from '../application/recipe-finder';
import { Recipe } from '../domain/recipe';

@Injectable()
export class RecipesService {
  constructor(
    private readonly recipeCreator: RecipeCreator,
    private readonly recipeFinder: RecipeFinder,
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
}
