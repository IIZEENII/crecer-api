import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesModule } from './recipes/infrastructure/recipes.module';
import { Recipe } from './recipes/domain/recipe';
import { EmployeesModule } from './employees/infrastructure/employees.module';
import { Employee } from './employees/domain/employee';
import { RecipeVariantsModule } from './recipe-variants/infrastructure/recipe-variants.module';
import { RecipeVariant } from './recipe-variants/domain/recipe-variant';
import { ProceduresModule } from './procedures/infrastructure/procedures.module';
import { Procedure } from './procedures/domain/procedure';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Utmisjimenez21032002',
      database: 'crecer-database',
      entities: [Recipe, RecipeVariant, Procedure, Employee],
      synchronize: true,
    }),
    RecipesModule,
    EmployeesModule,
    RecipeVariantsModule,
    ProceduresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
