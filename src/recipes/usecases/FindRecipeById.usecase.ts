import { Repository } from 'typeorm';
import { Recipe } from '../entities/recipe';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindRecipeByIdUsecase {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async execute(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOneBy({ id });

    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }

    return recipe;
  }
}
