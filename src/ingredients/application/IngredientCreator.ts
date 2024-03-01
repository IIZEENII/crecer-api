import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/Ingredient';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from '../infrastructure/dtos/CreateIngredientDto';

@Injectable()
export class IngredientCreator {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<void> {
    this.ingredientRepository.insert(createIngredientDto);
  }
}
