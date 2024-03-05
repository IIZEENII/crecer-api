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
    // TODO: validate if element was found and get ingredients by recipe variants
    return await this.ingredientRepository.findOneBy({ id });
  }
}
