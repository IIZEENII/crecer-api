import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/Ingredient';
import { Repository } from 'typeorm';
import { UpdateIngredientPriceDto } from '../infrastructure/dtos/UpdateIngredientPriceDto';

export class IngredientPriceUpdater {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async update(
    id: string,
    updateIngredientPriceDto: UpdateIngredientPriceDto,
  ): Promise<void> {
    try {
      this.tryToUpdate(id, updateIngredientPriceDto);
    } catch (error) {
      console.log(error);
    }
  }

  async tryToUpdate(
    id: string,
    updateIngredientPriceDto: UpdateIngredientPriceDto,
  ): Promise<void> {
    this.ingredientRepository.update(id, updateIngredientPriceDto);
  }
}
