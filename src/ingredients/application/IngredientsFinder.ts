import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/Ingredient';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IngredientsFinder {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async findById(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOneBy({ id });
    if (!ingredient) {
      throw new NotFoundException('ingredient not found');
    }
    return ingredient;
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  async findWithRecipeVariantsById(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository
      .createQueryBuilder('ingredient')
      .leftJoinAndSelect('ingredient.recipeVariants', 'variants')
      .where('ingredient.id = :id', { id })
      .getOne();

    if (!ingredient) {
      throw new NotFoundException('ingredient not found');
    }

    return ingredient;
  }

  //TODO: When the method returns empty list, return not found exeption
  async findIngredientsByIds(ingredientIds: string[]): Promise<Ingredient[]> {
    return this.ingredientRepository
      .createQueryBuilder('ingredient')
      .where('ingredient.id IN (:...ids)', { ids: ingredientIds })
      .getMany();
  }
}
