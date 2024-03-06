import { Repository } from 'typeorm';
import { Recipe } from '../domain/Recipe';
import { InjectRepository } from '@nestjs/typeorm';

export class RecipeFinder {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository
      .createQueryBuilder('recipe')
      .innerJoinAndSelect('recipe.variants', 'variant')
      .getMany();
  }

  findById(id: string): Promise<Recipe> {
    return this.recipeRepository
      .createQueryBuilder('recipe')
      .innerJoinAndSelect('recipe.variants', 'variant')
      .innerJoinAndSelect('variant.product', 'product')
      .where('recipe.id = :id', { id })
      .andWhere('product.id IS NOT NULL')
      .getOne();
  }
}
