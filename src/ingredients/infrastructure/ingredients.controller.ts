import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { Ingredient } from '../domain/ingredient';

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
}
