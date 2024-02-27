import { Injectable } from '@nestjs/common';
import { IngredientCreator } from '../application/ingredient-creator';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { IngredientFinder } from '../application/ingredient-finder';
import { Ingredient } from '../domain/ingredient';

@Injectable()
export class IngredientsService {
  constructor(
    private readonly ingredientCreator: IngredientCreator,
    private readonly ingredientFinder: IngredientFinder, 
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<void> {
    this.ingredientCreator.create(createIngredientDto);
  }

  async findById(id: string): Promise<Ingredient> {
    return this.ingredientFinder.findById(id);
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientFinder.findAll();
  }
}
