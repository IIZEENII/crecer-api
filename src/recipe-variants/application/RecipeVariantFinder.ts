import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/RecipeVariant';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeVariantFinder {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async findById(id: string): Promise<RecipeVariant> {
    return this.recipeVariantRepository
      .createQueryBuilder('recipeVariant')
      .leftJoinAndSelect('recipeVariant.ingredients', 'ingredient')
      .leftJoinAndSelect('recipeVariant.procedures', 'procedure')
      .where('recipeVariant.id = :id', { id })
      .getOne();
  }

  async findAll(): Promise<RecipeVariant[]> {
    return this.recipeVariantRepository
      .createQueryBuilder('recipeVariant')
      .leftJoinAndSelect('recipeVariant.ingredients', 'ingredient')
      .leftJoinAndSelect('recipeVariant.procedures', 'procedure')
      .getMany();
  }

  async findWithRecipeJoined(id: string): Promise<RecipeVariant> {
    return this.recipeVariantRepository
      .createQueryBuilder('recipeVariant')
      .leftJoinAndSelect('recipeVariant.recipe', 'recipe')
      .where('variant.id = :id', { id })
      .getOne();
  }
}
