import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../entities/ingredient';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindIngredientWithRecipeVariantsByIdUsecase {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async execute(id: string): Promise<Ingredient> {
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
}
