import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/ingredient';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientFinder {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async findById(id: string): Promise<Ingredient> {
    return this.ingredientRepository.findOneBy({ id });
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  // TODO: check if inner Join get the ingredient or is omited and return 404 if not exists
  async findJoinedWithRecipeVariantsAndProductsById(
    id: string,
  ): Promise<Ingredient> {
    return this.ingredientRepository
      .createQueryBuilder('ingredient')
      .innerJoinAndSelect('ingredient.recipeVariants', 'recipeVariants')
      .innerJoinAndSelect('product', 'product')
      .where('ingredient.id :id', { id })
      .getOne();
  }
}
