import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient';
import { UpdateIngredientUsecase } from './usecases/UpdateIngredient.usecase';
import { DeleteIngredientWithoutRecipeVariantsUsecase } from './usecases/DeleteIngredientWithoutRecipeVariants.usecase';
import { CreateIngredientUsecase } from './usecases/CreateIngredient.usecase';
import { CreateIngredientController } from './controllers/CreateIngredient.controller';
import { DeleteIngredientController } from './controllers/DeleteIngredient.controller';
import { UpdateIngredientController } from './controllers/UpdateIngredient.controller';
import { FindIngredientByIdUsecase } from './usecases/FindIngredientById.usecase';
import { FindAllIngredientsUsecase } from './usecases/FindAllIngredients.usecase';
import { FindIngredientWithRecipeVariantsByIdUsecase } from './usecases/FindIngredientWithRecipeVariantsById.usecase';
import { FindIngredientByIdController } from './controllers/FindIngredientById.usecase';
import { FindIngredientsByIdsUsecase } from './usecases/FindIngredientsByIds.usecase';
import { FindAllIngredientsController } from './controllers/FindAllIngredients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [
    CreateIngredientController,
    DeleteIngredientController,
    UpdateIngredientController,
    FindAllIngredientsController,
    FindIngredientByIdController,
  ],
  providers: [
    UpdateIngredientUsecase,
    CreateIngredientUsecase,
    FindIngredientByIdUsecase,
    FindAllIngredientsUsecase,
    FindIngredientsByIdsUsecase,
    FindIngredientWithRecipeVariantsByIdUsecase,
    DeleteIngredientWithoutRecipeVariantsUsecase,
  ],
  exports: [FindIngredientByIdUsecase, FindIngredientsByIdsUsecase],
})
export class IngredientsModule {}
