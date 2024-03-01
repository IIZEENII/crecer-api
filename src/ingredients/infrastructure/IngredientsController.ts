import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Ingredient } from '../domain/Ingredient';
import { IngredientFinderById } from '../application/IngredientFinderById';
import { AllIngredientsFinder } from '../application/AllIngredientsFinder';
import { IngredientCreator } from '../application/IngredientCreator';
import { IngredientUnitTypeUpdaterWithoutRecipeVariants } from '../application/IngredientUnitTypeUpdaterWithoutRecipeVariants';
import { CreateIngredientDto } from './dtos/CreateIngredientDto';
import { UpdateIngredientUnitTypeDto } from './dtos/UpdateIngredientUnitTypeDto';
import { IngredientDeleterWithoutRecipeVariants } from '../application/IngredientDeleterWithoutRecipeVariants';
import { IngredientNameUpdater } from '../application/IngredientNameUpdater';
import { IngredientPriceUpdater } from '../application/IngredientPriceUpdater';
import { IngredientStockUpdater } from '../application/IngredientStockUpdater';
import { UpdateIngredientNameDto } from './dtos/UpdateIngredientNameDto';
import { UpdateIngredientStockDto } from './dtos/UpdateIngredientStockDto';
import { UpdateIngredientPriceDto } from './dtos/UpdateIngredientPriceDto';

@Controller('ingredients')
export class IngredientsController {
  constructor(
    private readonly ingredientFinderById: IngredientFinderById,
    private readonly allIngredientsFinder: AllIngredientsFinder,
    private readonly ingredientCreator: IngredientCreator,
    private readonly ingredientUnitTypeUpdaterWithoutRecipeVariants: IngredientUnitTypeUpdaterWithoutRecipeVariants,
    private readonly ingredientDeleterWithoutRecipeVariants: IngredientDeleterWithoutRecipeVariants,
    private readonly ingredientNameUpdater: IngredientNameUpdater,
    private readonly ingredientStockUpdater: IngredientStockUpdater,
    private readonly ingredientPriceUpdater: IngredientPriceUpdater,
  ) {}

  @Post()
  async create(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<void> {
    this.ingredientCreator.create(createIngredientDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientFinderById.find(id);
  }

  @Get()
  async findAll(): Promise<Ingredient[]> {
    return this.allIngredientsFinder.find();
  }

  @Patch(':id/name')
  async updateName(
    @Param('id') id: string,
    updateIngredientNameDto: UpdateIngredientNameDto,
  ): Promise<void> {
    this.ingredientNameUpdater.update(id, updateIngredientNameDto);
  }

  @Patch(':id/stock')
  async updateStock(
    @Param('id') id: string,
    updateIngredientStockDto: UpdateIngredientStockDto,
  ): Promise<void> {
    this.ingredientStockUpdater.update(id, updateIngredientStockDto);
  }

  @Patch(':id/price')
  async updatePrice(
    @Param('id') id: string,
    updateIngredientPriceDto: UpdateIngredientPriceDto,
  ): Promise<void> {
    this.ingredientPriceUpdater.update(id, updateIngredientPriceDto);
  }

  @Patch(':id/unit-type')
  async updateUnitType(
    @Param('id') id: string,
    @Body() updateIngredientUnitType: UpdateIngredientUnitTypeDto,
  ): Promise<void> {
    this.ingredientUnitTypeUpdaterWithoutRecipeVariants.update(
      id,
      updateIngredientUnitType,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.ingredientDeleterWithoutRecipeVariants.delete(id);
  }
}
