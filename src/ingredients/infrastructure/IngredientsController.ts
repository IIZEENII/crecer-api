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
import { IngredientCreator } from '../application/IngredientCreator';
import { CreateIngredientDto } from './dtos/CreateIngredient.dto';
import { IngredientDeleterWithoutRecipeVariants } from '../application/IngredientDeleterWithoutRecipeVariants';
import { IngredientUpdater } from '../application/IngredientUpdater';
import { UpdateIngredientDto } from './dtos/UpdateIngredient.dto';
import { IdParam } from '../../shared/infrastructure/http/params/IdParam.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IngredientsFinder } from '../application/IngredientsFinder';

@ApiBearerAuth()
@ApiTags('Ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(
    private readonly ingredientsFinder: IngredientsFinder,
    private readonly ingredientCreator: IngredientCreator,
    private readonly ingredientDeleterWithoutRecipeVariants: IngredientDeleterWithoutRecipeVariants,
    private readonly ingredientUpdater: IngredientUpdater,
  ) {}

  @Post()
  async create(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<void> {
    return this.ingredientCreator.create(createIngredientDto);
  }

  @Get(':id')
  async findById(@Param() IdParam: IdParam): Promise<Ingredient> {
    return this.ingredientsFinder.findById(IdParam.id);
  }

  @Get()
  async findAll(): Promise<Ingredient[]> {
    return this.ingredientsFinder.findAll();
  }

  @Patch(':id')
  async updateName(
    @Param() { id }: IdParam,
    @Body() updateIngredientNameDto: UpdateIngredientDto,
  ): Promise<void> {
    const ingredient =
      await this.ingredientsFinder.findWithRecipeVariantsById(id);

    return this.ingredientUpdater.update(ingredient, updateIngredientNameDto);
  }

  @Delete(':id')
  async delete(@Param() { id }: IdParam) {
    const ingredient =
      await this.ingredientsFinder.findWithRecipeVariantsById(id);

    return this.ingredientDeleterWithoutRecipeVariants.delete(ingredient);
  }
}
