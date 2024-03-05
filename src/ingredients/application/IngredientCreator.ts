import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/Ingredient';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from '../infrastructure/dtos/CreateIngredient.dto';

@Injectable()
export class IngredientCreator {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<void> {
    await this.ingredientRepository.save(createIngredientDto);
  }
}
