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
}
