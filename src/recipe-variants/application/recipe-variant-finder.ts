import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/recipe-variant';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeVariantFinder {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async findById(id: string): Promise<RecipeVariant> {
    return this.recipeVariantRepository
      .createQueryBuilder('variant')
      .innerJoinAndSelect('variant.product', 'product')
      .where('variant.id = :id', { id })
      .getOne();
  }

  async findAll(): Promise<RecipeVariant[]> {
    return this.recipeVariantRepository.find();
  }

  async findWithRecipeJoined(id: string): Promise<RecipeVariant> {
    return this.recipeVariantRepository
      .createQueryBuilder('variant')
      .innerJoinAndSelect('variant.recipe', 'recipe')
      .where('variant.id = :id', { id })
      .getOne();
  }
}
