import { Repository } from 'typeorm';
import { Recipe } from '../entities/recipe';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteRecipeUsecase {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async execute(recipe: Recipe): Promise<void> {
    this.recipeRepository.remove(recipe);
  }
}
