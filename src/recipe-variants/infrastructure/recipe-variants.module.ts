import { Module } from '@nestjs/common';
import { RecipeVariantsService } from './recipe-variants.service';
import { RecipeVariantsController } from './recipe-variants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/recipe-variant';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/unit-of-work-for-recipes';
import { RecipeVariantCopier } from '../application/recipe-variant-copier';
import { RecipeVariantFinder } from '../application/recipe-variant-finder';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeVariant])],
  controllers: [RecipeVariantsController],
  providers: [
    RecipeVariantsService,
    RecipeVariantCopier,
    RecipeVariantFinder,
    UnitOfWorkForRecipes,
  ],
})
export class RecipeVariantsModule {}
