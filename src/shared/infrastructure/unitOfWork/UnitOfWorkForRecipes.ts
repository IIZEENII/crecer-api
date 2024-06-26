import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { UnitOfWork } from './UnitOfWork';
import { Recipe } from '@src/recipes/entities/recipe';
import { RecipeVariant } from '@src/recipeVariants/entities/RecipeVariant';
import { Product } from '@src/products/entities/product';
import { Ingredient } from '@src/ingredients/entities/ingredient';
import { Procedure } from '@src/procedures/entities/Producedure';

@Injectable()
export class UnitOfWorkForRecipes implements UnitOfWork {
  private queryRunner: QueryRunner;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async beginTransaction(): Promise<void> {
    this.queryRunner = this.entityManager.connection.createQueryRunner();
    await this.queryRunner.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    if (this.queryRunner) {
      await this.queryRunner.commitTransaction();
      await this.releaseQueryRunner();
    }
  }

  async rollbackTransaction(): Promise<void> {
    if (this.queryRunner) {
      await this.queryRunner.rollbackTransaction();
      await this.releaseQueryRunner();
    }
  }

  private async releaseQueryRunner(): Promise<void> {
    if (this.queryRunner) {
      await this.queryRunner.release();
      this.queryRunner = null;
    }
  }

  get recipeRepository(): Repository<Recipe> {
    return this.queryRunner.manager.getRepository(Recipe);
  }

  get recipeVariantRepository(): Repository<RecipeVariant> {
    return this.queryRunner.manager.getRepository(RecipeVariant);
  }

  get productRepository(): Repository<Product> {
    return this.queryRunner.manager.getRepository(Product);
  }

  get ingredientRepository(): Repository<Ingredient> {
    return this.queryRunner.manager.getRepository(Ingredient);
  }

  get procedureRepository(): Repository<Procedure> {
    return this.queryRunner.manager.getRepository(Procedure);
  }
}
