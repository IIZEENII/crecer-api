import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/Ingredient';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';
import { PageMetaDto } from '@src/shared/infrastructure/dtos/PageMeta.dto';
import { PageDto } from '@src/shared/infrastructure/dtos/Page.dto';

@Injectable()
export class IngredientsFinder {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async findById(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOneBy({ id });
    if (!ingredient) {
      throw new NotFoundException('ingredient not found');
    }
    return ingredient;
  }

  async findAll(filterOptions: PageOptionsDto): Promise<PageDto<Ingredient>> {
    const queryBuilder =
      this.ingredientRepository.createQueryBuilder('ingredient');

    queryBuilder
      .orderBy('ingredient.name', filterOptions.order)
      .skip(filterOptions.skip)
      .take(filterOptions.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMeta = new PageMetaDto({
      itemCount,
      pageOptionsDto: filterOptions,
    });

    return new PageDto(entities, pageMeta);
  }

  async findWithRecipeVariantsById(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository
      .createQueryBuilder('ingredient')
      .leftJoinAndSelect('ingredient.recipeVariants', 'variants')
      .where('ingredient.id = :id', { id })
      .getOne();

    if (!ingredient) {
      throw new NotFoundException('ingredient not found');
    }

    return ingredient;
  }

  //TODO: When the method returns empty list, return not found exeption
  async findIngredientsByIds(ingredientIds: string[]): Promise<Ingredient[]> {
    return this.ingredientRepository
      .createQueryBuilder('ingredient')
      .where('ingredient.id IN (:...ids)', { ids: ingredientIds })
      .getMany();
  }
}
