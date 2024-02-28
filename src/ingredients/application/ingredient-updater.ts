import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/ingredient';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IngredientFinder } from './ingredient-finder';
import { UpdateIngredientUnitTypeDto } from '../infrastructure/dtos/update-ingredient-unit-type.dto';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/unit-of-work-for-recipes';
import { UpdateIngredientStockDto } from '../infrastructure/dtos/update-ingredient-stock.dto';
import { UpdateIngredientPriceDto } from '../infrastructure/dtos/update-ingredient-price.dto';
import { UpdateIngredientNameDto } from '../infrastructure/dtos/update-ingredient-name.dto';

@Injectable()
export class IngredientUpdater {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    private readonly ingredienFinder: IngredientFinder,
    private readonly unitOfWork: UnitOfWorkForRecipes,
  ) {}

  async updateStock(
    id: string,
    updateIngredientStockDto: UpdateIngredientStockDto,
  ): Promise<void> {
    this.ingredientRepository.update(id, updateIngredientStockDto);
  }

  async updatePrice(
    id: string,
    updateIngredientPriceDto: UpdateIngredientPriceDto,
  ): Promise<void> {
    this.ingredientRepository.update(id, updateIngredientPriceDto);
  }

  async updateName(
    id: string,
    updateIngredientNameDto: UpdateIngredientNameDto,
  ) {
    this.ingredientRepository.update(id, updateIngredientNameDto);
  }

  async updateIngredientUnitTypeIfNotInRecipeVariants(
    id: string,
    updateIngredientUnitTypeDto: UpdateIngredientUnitTypeDto,
  ) {
    try {
      await this.unitOfWork.beginTransaction();

      const ingredient =
        await this.ingredienFinder.findJoinedWithRecipeVariantsAndProductsById(
          id,
        );

      if (!this.isIngredientInRecipeVariants(ingredient)) {
        await this.ingredientRepository.update(id, updateIngredientUnitTypeDto);
        await this.unitOfWork.commitTransaction();
      }

      this.unitOfWork.rollbackTransaction();
    } catch (error) {
      await this.unitOfWork.rollbackTransaction();
    }
  }

  private isIngredientInRecipeVariants(ingredient: Ingredient): boolean {
    return ingredient.recipeVariants.length > 0;
  }
}
