import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRecipeDto } from './dtos/CreateRecipe.dto';
import { Recipe } from '../domain/Recipe';
import { UpdateRecipeDto } from './dtos/UpdateRecipe.dto';
import { ApiTags } from '@nestjs/swagger';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { RecipeCreator } from '../application/RecipeCreator';
import { RecipeFinder } from '../application/RecipeFinder';
import { RecipeUpdater } from '../application/RecipeUpdater';
import { RecipeDeleter } from '../application/RecipeDeleter';
import { CreateRecipeVariantDto } from '@src/recipe-variants/infrastructure/dtos/CreateRecipeVariant.dto';
import { RecipeVariantCreator } from '@src/recipe-variants/application/RecipeVariantCreator';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipeCreator: RecipeCreator,
    private readonly recipeFinder: RecipeFinder,
    private readonly recipeCategoryUpdater: RecipeUpdater,
    private readonly recipeDeleter: RecipeDeleter,
    private readonly recipeVariantCreator: RecipeVariantCreator,
  ) {}

  @Get()
  async findAll(): Promise<Recipe[]> {
    return this.recipeFinder.findAll();
  }

  @Get(':id')
  async findById(@Param() { id }: IdParam): Promise<Recipe> {
    return this.recipeFinder.findById(id);
  }

  @Get(':id/variants')
  async findWithVariantsById(@Param() { id }: IdParam): Promise<Recipe> {
    return this.recipeFinder.findWithVariantsById(id);
  }

  @Get(':id/to-pdf')
  async generatedPDF(@Param() { id }: IdParam): Promise<void> {
    console.log(id);
  }

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<void> {
    return this.recipeCreator.create(createRecipeDto);
  }

  @Patch(':id')
  async update(
    @Param() { id }: IdParam,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<void> {
    const recipe = await this.recipeFinder.findWithVariantsAndProductsById(id);
    this.recipeCategoryUpdater.update(recipe, updateRecipeDto);
  }

  @Delete(':id')
  async delete(@Param() { id }: IdParam): Promise<void> {
    const recipe = await this.recipeFinder.findById(id);
    return this.recipeDeleter.delete(recipe);
  }

  @Post(':id/variants')
  async createVariant(
    @Param() { id }: IdParam,
    @Body() createRecipeVariantDto: CreateRecipeVariantDto,
  ): Promise<void> {
    console.log(id);
    this.recipeVariantCreator.create(createRecipeVariantDto);
  }

  @Delete(':id/variants/:id')
  async deleteVariant(@Param() { id }: IdParam): Promise<void> {
    console.log(id);
  }
}
