import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../entities/RecipeVariant';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeVariantFinder {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async findById(id: string): Promise<RecipeVariant> {
    const recipeVariant = await this.recipeVariantRepository.findOneBy({ id });

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

  async findWithIngredientsById(id: string): Promise<RecipeVariant> {
    const recipeVariant = await this.recipeVariantRepository
      .createQueryBuilder('recipeVariant')
      .leftJoinAndSelect('recipeVariant.ingredients', 'ingredient')
      .where('recipeVariant.id = :id', { id })
      .getOne();

    if (!recipeVariant) {
      throw new NotFoundException('recipe variant not found');
    }

    return recipeVariant;
  }

  async findWithProceduresById(id: string): Promise<RecipeVariant> {
    const recipeVariant = await this.recipeVariantRepository
      .createQueryBuilder('recipeVariant')
      .leftJoinAndSelect('recipeVariant.procedures', 'procedures')
      .where('recipeVariant.id = :id', { id })
      .getOne();

    if (!recipeVariant) {
      throw new NotFoundException('recipe variant not found');
    }

    return recipeVariant;
  }
}
