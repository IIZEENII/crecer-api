import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRecipeDto } from './dtos/CreateRecipe.dto';
import { Recipe } from '../domain/Recipe';
import { UpdateRecipeDto } from './dtos/UpdateRecipe.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { RecipeCreator } from '../application/RecipeCreator';
import { RecipeFinder } from '../application/RecipeFinder';
import { RecipeUpdater } from '../application/RecipeUpdater';
import { RecipeDeleter } from '../application/RecipeDeleter';
import { CreateRecipeVariantDto } from '@src/recipe-variants/infrastructure/dtos/CreateRecipeVariant.dto';
import { RecipeVariantCreator } from '@src/recipe-variants/application/RecipeVariantCreator';
import { PageDto } from '@src/shared/infrastructure/dtos/Page.dto';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';

@ApiBearerAuth()
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
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<Recipe>> {
    return this.recipeFinder.findAll(pageOptionsDto);
  }

  @Get(':id')
  async findById(@Param() { id }: IdParam): Promise<Recipe> {
    return this.recipeFinder.findById(id);
  }

  @Get(':id/variants')
  async findWithVariantsById(@Param() { id }: IdParam): Promise<Recipe> {
    return this.recipeFinder.findWithVariantsById(id);
  }

  //TODO: implement
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

  //TODO:
  @Delete(':id')
  async delete(@Param() { id }: IdParam): Promise<void> {
    const recipe = await this.recipeFinder.findById(id);
    return this.recipeDeleter.delete(recipe);
  }

  //TODO:
  @Post(':id/variants')
  async createVariant(
    @Param() { id }: IdParam,
    @Body() createRecipeVariantDto: CreateRecipeVariantDto,
  ): Promise<void> {
    console.log(id);
    this.recipeVariantCreator.create(createRecipeVariantDto);
  }
}
