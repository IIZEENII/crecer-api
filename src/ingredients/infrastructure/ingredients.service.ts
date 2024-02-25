import { Injectable } from '@nestjs/common';
import { IngredientCreator } from '../application/ingredient-creator';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(private readonly ingredientCreator: IngredientCreator) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<void> {
    this.ingredientCreator.create(createIngredientDto);
  }
}
