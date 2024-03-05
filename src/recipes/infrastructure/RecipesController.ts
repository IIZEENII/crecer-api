import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRecipeDto } from './dtos/CreateRecipe.dto';
import { RecipesService } from './RecipesSservice';
import { Recipe } from '../domain/Recipe';
import { UpdateRecipeCategoryDto } from './dtos/UpdateRecipeCategory.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<void> {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  async getAll(): Promise<Recipe[]> {
    return this.recipesService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Recipe> {
    return this.recipesService.findById(id);
  }

  @Patch('/category/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateRecipeCategoryDto: UpdateRecipeCategoryDto,
  ): Promise<void> {
    this.recipesService.updateCategory(id, updateRecipeCategoryDto);
  }
}
