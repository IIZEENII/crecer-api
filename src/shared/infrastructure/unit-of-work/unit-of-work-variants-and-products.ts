import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UnitOfWork } from './unit-of-work';
import { RecipeVariant } from 'src/recipe-variants/domain/recipe-variant';
import { Product } from 'src/products/domain/product';

@Injectable()
export class UnitOfWorkVariantsAndProducts implements UnitOfWork {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async beginTransaction(): Promise<void> {
    this.entityManager.queryRunner.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    this.entityManager.queryRunner.commitTransaction();
  }

  async rollbackTransaction(): Promise<void> {
    this.entityManager.queryRunner.rollbackTransaction();
  }

  get recipeVariantRepository(): Repository<RecipeVariant> {
    return this.entityManager.getRepository(RecipeVariant);
  }

  get productRepository(): Repository<Product> {
    return this.entityManager.getRepository(Product);
  }
}
