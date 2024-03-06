import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../domain/Recipe';

@Injectable()
export class RecipeFinderJoinedToRecipeVariantsAndProducts {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async findById(id: string): Promise<Recipe> {
    return await this.recipeRepository
      .createQueryBuilder('recipe')
      .innerJoinAndSelect('recipe.variants', 'variant')
      .innerJoinAndSelect('variant.product', 'product')
      .where('recipe.id = :id', { id })
      .getOne();
  }
}
