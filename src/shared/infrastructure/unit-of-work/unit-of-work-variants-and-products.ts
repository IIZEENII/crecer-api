import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { UnitOfWork } from './unit-of-work';
import { RecipeVariant } from 'src/recipe-variants/domain/recipe-variant';
import { Product } from 'src/products/domain/product';

@Injectable()
export class UnitOfWorkVariantsAndProducts implements UnitOfWork {
  private queryRunner: QueryRunner;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async beginTransaction(): Promise<void> {
    this.queryRunner = this.entityManager.connection.createQueryRunner();
    this.queryRunner.startTransaction();
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

  get recipeVariantRepository(): Repository<RecipeVariant> {
    return this.queryRunner.manager.getRepository(RecipeVariant);
  }

  get productRepository(): Repository<Product> {
    return this.queryRunner.manager.getRepository(Product);
  }
}
