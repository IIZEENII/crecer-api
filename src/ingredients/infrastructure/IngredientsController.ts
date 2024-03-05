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
import { CreateIngredientDto } from './dtos/CreateIngredient.dto';
import { UpdateIngredientUnitTypeDto } from './dtos/UpdateIngredientUnitType.dto';
import { IngredientDeleterWithoutRecipeVariants } from '../application/IngredientDeleterWithoutRecipeVariants';
import { IngredientNameUpdater } from '../application/IngredientNameUpdater';
import { IngredientPriceUpdater } from '../application/IngredientPriceUpdater';
import { IngredientStockUpdater } from '../application/IngredientStockUpdater';
import { UpdateIngredientNameDto } from './dtos/UpdateIngredientName.dto';
import { UpdateIngredientStockDto } from './dtos/UpdateIngredientStock.dto';
import { UpdateIngredientPriceDto } from './dtos/UpdateIngredientPrice.dto';
import { IdParam } from '../../shared/infrastructure/http/params/IdParam.dto';
import { IngredientFinderJoinedToRecipeVariants } from '../application/IngredientFinderWithRecipeVariants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ingredients')
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
    private readonly ingre: IngredientFinderJoinedToRecipeVariants,
  ) {}

  @Post()
  async create(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<void> {
    return this.ingredientCreator.create(createIngredientDto);
  }

  @Get(':id')
  async findById(@Param() IdParam: IdParam): Promise<Ingredient> {
    return this.ingredientFinderById.find(IdParam.id);
  }

  @Get()
  async findAll(): Promise<Ingredient[]> {
    return this.allIngredientsFinder.find();
  }

  @Patch(':id/name')
  async updateName(
    @Param() { id }: IdParam,
    @Body() updateIngredientNameDto: UpdateIngredientNameDto,
  ): Promise<void> {
    return this.ingredientNameUpdater.update(id, updateIngredientNameDto);
  }

  @Patch(':id/stock')
  async updateStock(
    @Param() { id }: IdParam,
    @Body() updateIngredientStockDto: UpdateIngredientStockDto,
  ): Promise<void> {
    return this.ingredientStockUpdater.update(id, updateIngredientStockDto);
  }

  @Patch(':id/price')
  async updatePrice(
    @Param() { id }: IdParam,
    @Body() updateIngredientPriceDto: UpdateIngredientPriceDto,
  ): Promise<void> {
    return this.ingredientPriceUpdater.update(id, updateIngredientPriceDto);
  }

  @Patch(':id/unit-type')
  async updateUnitType(
    @Param() { id }: IdParam,
    @Body() updateIngredientUnitType: UpdateIngredientUnitTypeDto,
  ): Promise<void> {
    return this.ingredientUnitTypeUpdaterWithoutRecipeVariants.update(
      id,
      updateIngredientUnitType,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ingredientDeleterWithoutRecipeVariants.delete(id);
  }

  @Get('dummy/:id')
  async getDummy(@Param('id') id: string) {
    return this.ingre.findById(id);
  }
}
