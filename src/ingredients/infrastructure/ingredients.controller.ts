import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { Ingredient } from '../domain/ingredient';
import { UpdateIngredientUnitTypeDto } from './dtos/update-ingredient-unit-type.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  async create(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<void> {
    this.ingredientsService.create(createIngredientDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientsService.findById(id);
  }

  @Get()
  async findAll(): Promise<Ingredient[]> {
    return this.ingredientsService.findAll();
  }

  @Patch(':id/unit-type')
  async updateMeasurementUnit(
    @Param('id') id: string,
    @Body() updateIngredientUnitType: UpdateIngredientUnitTypeDto,
  ): Promise<void> {
    this.ingredientsService.updateIngredientUnitTypeIfNotInRecipeVariants(
      id,
      updateIngredientUnitType,
    );
  }
}
