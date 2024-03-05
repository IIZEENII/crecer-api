import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesModule } from './recipes/infrastructure/RecipesModule';
import { Recipe } from './recipes/domain/Recipe';
import { EmployeesModule } from './employees/infrastructure/EmployeesModule';
import { Employee } from './employees/domain/Employee';
import { RecipeVariantsModule } from './recipe-variants/infrastructure/RecipeVariantsModule';
import { RecipeVariant } from './recipe-variants/domain/RecipeVariant';
import { ProceduresModule } from './procedures/infrastructure/ProceduresModule';
import { Procedure } from './procedures/domain/Producedure';
import { ProductsModule } from './products/infrastructure/ProductsModule';
import { Product } from './products/domain/Product';
import { IngredientsModule } from './ingredients/infrastructure/IngredientsModule';
import { Ingredient } from './ingredients/domain/Ingredient';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Utmisjimenez21032002',
      database: 'crecer-database',
      entities: [
        Recipe,
        RecipeVariant,
        Procedure,
        Product,
        Ingredient,
        Employee,
      ],
      synchronize: true,
    }),
    RecipesModule,
    EmployeesModule,
    RecipeVariantsModule,
    ProceduresModule,
    ProductsModule,
    IngredientsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
