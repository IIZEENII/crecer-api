import { Repository } from 'typeorm';
import { Recipe } from '../entities/recipe';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindRecipeWithVariantByIdUsecase {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async execute(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.variants', 'variant')
      .leftJoinAndSelect('variant.ingredients', 'ingredient')
      .leftJoinAndSelect('variant.procedures', 'procedure')
      .where('recipe.id = :id', { id })
      .getOne();

    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }

    return recipe;
  }
}
