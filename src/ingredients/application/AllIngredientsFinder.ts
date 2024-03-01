import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/Ingredient';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AllIngredientsFinder {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async find(): Promise<Ingredient[]> {
    try {
      return this.tryToFind();
    } catch (error) {
      console.log(error);
    }
  }

  async tryToFind() {
    return this.ingredientRepository.find();
  }
}
