import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RecipesService } from './recipes.service';
import { Recipe } from '../domain/recipe';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto): Promise<void> {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  getAll(): Promise<Recipe[]> {
    return this.recipesService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Recipe> {
    return this.recipesService.findById(id);
  }
}
