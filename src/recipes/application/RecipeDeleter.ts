import { Repository } from 'typeorm';
import { Recipe } from '../domain/Recipe';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipeDeleter {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async delete(recipe: Recipe): Promise<void> {
    this.recipeRepository.remove(recipe);
  }
}
