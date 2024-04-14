import { Repository } from 'typeorm';
import { Recipe } from '../domain/Recipe';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PageDto } from '@src/shared/infrastructure/dtos/Page.dto';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';
import { PageMetaDto } from '@src/shared/infrastructure/dtos/PageMeta.dto';

@Injectable()
export class RecipeFinder {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) { }

  async findAll(filterOptions: PageOptionsDto): Promise<PageDto<Recipe>> {
    const queryBuilder =
      this.recipeRepository.createQueryBuilder('recipe');

    queryBuilder
      .orderBy('recipe.title', filterOptions.order)
      .skip(filterOptions.skip)
      .take(filterOptions.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto: filterOptions });

    return new PageDto(entities, pageMeta);
  }

  async findById(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOneBy({ id });

    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }

    return recipe;
  }

  async findWithVariantsById(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.variants', 'variant')
      .leftJoinAndSelect('variant.ingredients', 'ingredient')
      .leftJoinAndSelect('variant.procedures', 'procedure')
      .where('recipe.id = :id', { id })
      .getOne();

    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }

    return recipe;
  }

  findWithVariantsAndProductsById(id: string): Promise<Recipe> {
    const recipe = this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.variants', 'variant')
      .leftJoinAndSelect('variant.product', 'product')
      .where('recipe.id = :id', { id })
      .getOne();

    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }

    return recipe;
  }
}
