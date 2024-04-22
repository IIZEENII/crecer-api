import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../entities/ingredient';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindIngredientsByIdsUsecase {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  //TODO: When the method returns empty list, return not found exeption
  async execute(ingredientIds: string[]): Promise<Ingredient[]> {
    return this.ingredientRepository
      .createQueryBuilder('ingredient')
      .where('ingredient.id IN (:...ids)', { ids: ingredientIds })
      .getMany();
  }
}
