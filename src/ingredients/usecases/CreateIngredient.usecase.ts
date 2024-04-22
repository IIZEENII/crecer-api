import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../entities/ingredient';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from '../dtos/CreateIngredient.dto';

@Injectable()
export class CreateIngredientUsecase {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async execute(createIngredientDto: CreateIngredientDto): Promise<void> {
    await this.ingredientRepository.save(createIngredientDto);
  }
}
