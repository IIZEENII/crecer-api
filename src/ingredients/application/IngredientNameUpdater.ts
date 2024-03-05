import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/Ingredient';
import { Repository } from 'typeorm';
import { UpdateIngredientNameDto } from '../infrastructure/dtos/UpdateIngredientName.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
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
      return this.tryToUpdate(id, updateIngredientNameDto);
    } catch (error) {
      console.log(error);
    }
  }

  private async tryToUpdate(
    id: string,
    updateIngredientNameDto: UpdateIngredientNameDto,
  ): Promise<void> {
    const ingredientUpdated = await this.ingredientRepository.update(
      id,
      updateIngredientNameDto,
    );

    if (ingredientUpdated.affected != 1) {
      // TODO: refactoring to custom exeption as ProductNotFoundExeption
      throw new NotFoundException('ingredient not found');
    }
  }
}
