import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/Ingredient';
import { Repository } from 'typeorm';
import { UpdateIngredientStockDto } from '../infrastructure/dtos/UpdateIngredientStock.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientStockUpdater {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async update(
    id: string,
    updateIngredientStockDto: UpdateIngredientStockDto,
  ): Promise<void> {
    try {
      this.tryToUpdate(id, updateIngredientStockDto);
    } catch (error) {
      console.log(error);
    }
  }

  private async tryToUpdate(
    id: string,
    updateIngredientStockDto: UpdateIngredientStockDto,
  ): Promise<void> {
    this.ingredientRepository.update(id, updateIngredientStockDto);
  }
}
