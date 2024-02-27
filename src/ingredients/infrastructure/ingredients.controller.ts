import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { Ingredient } from '../domain/ingredient';
import { UpdateIngredientMeasurementDto } from './dtos/update-ingredient-measurement-unit.dto';

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

  @Patch(':id/measurement-unit')
  async updateMeasurementUnit(
    @Param('id') id: string,
    @Body() updateIngredientMeasurementDto: UpdateIngredientMeasurementDto,
  ): Promise<void> {
    this.ingredientsService.updateMeasurementUnit(
      id,
      updateIngredientMeasurementDto,
    );
  }
}
