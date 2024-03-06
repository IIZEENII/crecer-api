import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRecipeDto } from './dtos/CreateRecipe.dto';
import { Recipe } from '../domain/Recipe';
import { UpdateRecipeCategoryDto } from './dtos/UpdateRecipeCategory.dto';
import { ApiTags } from '@nestjs/swagger';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { RecipeCreator } from '../application/RecipeCreator';
import { RecipeFinder } from '../application/RecipeFinder';
import { RecipeCategoryUpdater } from '../application/RecipeCategoryUpdater';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipeCreator: RecipeCreator,
    private readonly recipeFinder: RecipeFinder,
    private readonly recipeCategoryUpdater: RecipeCategoryUpdater,
  ) {}

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<void> {
    return this.recipeCreator.create(createRecipeDto);
  }

  @Get()
  async getAll(): Promise<Recipe[]> {
    return this.recipeFinder.findAll();
  }

  @Get(':id')
  async getById(@Param() { id }: IdParam): Promise<Recipe> {
    return this.recipeFinder.findById(id);
  }

  @Patch(':id/category')
  async updateCategory(
    @Param() { id }: IdParam,
    @Body() updateRecipeCategoryDto: UpdateRecipeCategoryDto,
  ): Promise<void> {
    this.recipeCategoryUpdater.update(id, updateRecipeCategoryDto);
  }
}
