import { Injectable, NotFoundException } from '@nestjs/common';
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
    const recipeVariant = this.recipeVariantRepository.findOneBy({ id });

    if (!recipeVariant) {
      throw new NotFoundException('recipe variant not found');
    }

    return recipeVariant;
  }

  async findAll(): Promise<RecipeVariant[]> {
    return this.recipeVariantRepository
      .createQueryBuilder('recipeVariant')
      .leftJoinAndSelect('recipeVariant.ingredients', 'ingredient')
      .leftJoinAndSelect('recipeVariant.procedures', 'procedure')
      .getMany();
  }

  async findWithRecipetById(id: string): Promise<RecipeVariant> {
    const recipeVariant = await this.recipeVariantRepository
      .createQueryBuilder('recipeVariant')
      .leftJoinAndSelect('recipeVariant.recipe', 'recipe')
      .where('recipeVariant.id = :id', { id })
      .getOne();

    if (!recipeVariant) {
      throw new NotFoundException('recipe variant not found');
    }

    return recipeVariant;
  }
}
