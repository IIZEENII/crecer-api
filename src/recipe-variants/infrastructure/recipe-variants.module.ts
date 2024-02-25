import { Module } from '@nestjs/common';
import { RecipeVariantsService } from './recipe-variants.service';
import { RecipeVariantsController } from './recipe-variants.controller';
import { RecipeVariantCreator } from '../application/recipe-variant-creator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/recipe-variant';
import { UnitOfWorkVariantsAndProducts } from 'src/shared/infrastructure/unit-of-work/unit-of-work-variants-and-products';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeVariant])],
  controllers: [RecipeVariantsController],
  providers: [
    RecipeVariantsService,
    RecipeVariantCreator,
    UnitOfWorkVariantsAndProducts,
  ],
})
export class RecipeVariantsModule {}
