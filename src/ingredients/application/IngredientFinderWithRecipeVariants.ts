import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../domain/Ingredient';

@Injectable()
export class IngredientFinderJoinedToRecipeVariants {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async findById(id: string): Promise<Ingredient> {
    return this.ingredientRepository
      .createQueryBuilder('ingredient')
      .innerJoinAndSelect('ingredient.recipeVariants', 'recipeVariant')
      .innerJoinAndSelect('recipeVariant.product', 'product')
      .where('ingredient.id :id', { id })
      .getOne();
  }
}
