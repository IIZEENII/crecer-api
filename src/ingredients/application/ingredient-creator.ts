import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/ingredient';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from '../infrastructure/dtos/create-ingredient.dto';

@Injectable()
export class IngredientCreator {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<void> {
    const ingredientCreated =
      this.ingredientRepository.create(createIngredientDto);
    this.ingredientRepository.save(ingredientCreated);
  }
}
