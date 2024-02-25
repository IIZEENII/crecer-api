import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Recipe } from '../../../recipes/domain/recipe';
import { EntityManager, Repository } from 'typeorm';
import { UnitOfWork } from './unit-of-work';

@Injectable()
export class UnitOfWorkRecipeAndVariants implements UnitOfWork {
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

  get recipeRepository(): Repository<Recipe> {
    return this.entityManager.getRepository(Recipe);
  }
}
