import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesModule } from './recipes/infrastructure/recipes.module';
import { Recipe } from './recipes/domain/recipe';
import { EmployeesModule } from './employees/infrastructure/employees.module';
import { Empoloyee } from './employees/domain/employee';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Utmisjimenez21032002',
      database: 'crecer-database',
      entities: [Recipe, Empoloyee],
      synchronize: true,
    }),
    RecipesModule,
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
