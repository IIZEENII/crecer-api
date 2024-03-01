import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../domain/Ingredient';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientFinderById {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async find(id: string): Promise<Ingredient> {
    return this.ingredientRepository.findOneBy({ id });
  }
}
