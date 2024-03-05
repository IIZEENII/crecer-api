import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/RecipeVariant';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeVariantFinderJoinedToRecipe {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async findById(id: string): Promise<RecipeVariant> {
    return await this.recipeVariantRepository
      .createQueryBuilder('recipeVariants')
      .innerJoinAndSelect('recipeVariant.product', 'product')
      .innerJoinAndSelect('recipeVariant.recipe', 'recipe')
      .where('recipeVariant.id :id', { id })
      .getOne();
  }
}
