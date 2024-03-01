import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/Ingredient';
import { Repository } from 'typeorm';
import { UpdateIngredientNameDto } from '../infrastructure/dtos/UpdateIngredientNameDto';

export class IngredientNameUpdater {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async update(
    id: string,
    updateIngredientNameDto: UpdateIngredientNameDto,
  ): Promise<void> {
    try {
      this.tryToUpdate(id, updateIngredientNameDto);
    } catch (error) {
      console.log(error);
    }
  }

  async tryToUpdate(
    id: string,
    updateIngredientNameDto: UpdateIngredientNameDto,
  ): Promise<void> {
    this.ingredientRepository.update(id, updateIngredientNameDto);
  }
}
