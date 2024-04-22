import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { RecipeVariantCopier } from '../usecases/RecipeVariantCopier';
import { IngredientAgregatorForRecipeVariant } from '../usecases/IngredientAgregatorForRecipeVariant';
import { IngredientRemoverForRecipeVariant } from '../usecases/IngredientRemoveForRecipeVariant';
import { ProcedureCreatorForRecipeVariant } from '../usecases/ProcedureCreatorForRecipeVariant';
import { RecipeVariantUpdater } from '../usecases/RecipeVariantUpdater';
import { RecipeVariantFinder } from '../usecases/RecipeVariantFinder';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { CopyRecipeVariantDto } from '../dtos/CopyRecipeVariant.dto';
import { RemoveIngredientParams } from '../entities/http/params/DeleteIngredientParams.dto';
import { AddIngredientsByIdDto } from '../dtos/AddIngredientById.dto';
import { CreateProcedureDto } from '@src/procedures/dtos/CreateProcedure.dto';
import { UpdateRecipeVariantDto } from '../dtos/UpdateRecipeVariant.dto';
import { RecipeVariantDeleter } from '../usecases/RecipeVariantDeleter';
import { FindIngredientByIdUsecase } from '@src/ingredients/usecases/FindIngredientById.usecase';
import { FindIngredientsByIdsUsecase } from '@src/ingredients/usecases/FindIngredientsByIds.usecase';

@ApiBearerAuth()
@ApiTags('Recipe variants')
@Controller('recipe-variants')
export class RecipeVariantsController {
  constructor(
    private readonly recipeVariantFinder: RecipeVariantFinder,
    private readonly recipeVariantCopier: RecipeVariantCopier,
    private readonly recipeVariantUpdater: RecipeVariantUpdater,
    private readonly recipeVariantDeleter: RecipeVariantDeleter,
    private readonly findIngredientById: FindIngredientByIdUsecase,
    private readonly findIngredientsByIds: FindIngredientsByIdsUsecase,
    private readonly ingredientAgregatorForRecipeVariant: IngredientAgregatorForRecipeVariant,
    private readonly ingredientRemoverToRecipeVariant: IngredientRemoverForRecipeVariant,
    private readonly procedureCreatorForRecipeVariant: ProcedureCreatorForRecipeVariant,
  ) {}

  @Post(':id/copy')
  async copyVariant(
    @Param() { id }: IdParam,
    @Body() copyRecipeVariantDto: CopyRecipeVariantDto,
  ): Promise<void> {
    const recipeVariant =
      await this.recipeVariantFinder.findWithRecipetById(id);
    return this.recipeVariantCopier.copy(recipeVariant, copyRecipeVariantDto);
  }

  @Patch(':id')
  async update(
    @Param() { id }: IdParam,
    @Body() updateRecipeVariantDto: UpdateRecipeVariantDto,
  ): Promise<void> {
    const recipeVariant = await this.recipeVariantFinder.findById(id);

    return this.recipeVariantUpdater.update(
      recipeVariant.id,
      updateRecipeVariantDto,
    );
  }

  @Post(':id/ingredients')
  async addIngredients(
    @Param() { id }: IdParam,
    @Body() { ingredientIds }: AddIngredientsByIdDto,
  ): Promise<void> {
    const recipeVariant =
      await this.recipeVariantFinder.findWithIngredientsById(id);

    const ingredients = await this.findIngredientsByIds.execute(ingredientIds);

    return this.ingredientAgregatorForRecipeVariant.add(
      recipeVariant,
      ingredients,
    );
  }

  @Delete(':id/ingredients/:ingredientId')
  async removeIngredientInRecipeVariant(
    @Param() { id, ingredientId }: RemoveIngredientParams,
  ) {
    const recipeVariant =
      await this.recipeVariantFinder.findWithIngredientsById(id);

    const ingredient = await this.findIngredientById.execute(ingredientId);

    return await this.ingredientRemoverToRecipeVariant.remove(
      recipeVariant,
      ingredient.id,
    );
  }

  @Delete(':id')
  async remove(@Param() { id }: IdParam) {
    const recipeVariant = await this.recipeVariantFinder.findById(id);
    await this.recipeVariantDeleter.delete(recipeVariant);
  }

  @Post(':id/procedures')
  async addProcedure(
    @Param() { id }: IdParam,
    @Body() createProcedureDto: CreateProcedureDto,
  ): Promise<void> {
    const recipeVariant =
      await this.recipeVariantFinder.findWithProceduresById(id);

    return await this.procedureCreatorForRecipeVariant.create(
      recipeVariant,
      createProcedureDto,
    );
  }
}
