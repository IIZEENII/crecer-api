import { Repository } from 'typeorm';
import { Recipe } from '../entities/recipe';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PageDto } from '@src/shared/infrastructure/dtos/Page.dto';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';
import { PageMetaDto } from '@src/shared/infrastructure/dtos/PageMeta.dto';

@Injectable()
export class FindAllRecipesUsecase {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async execute(filterOptions: PageOptionsDto): Promise<PageDto<Recipe>> {
    const queryBuilder = this.recipeRepository.createQueryBuilder('recipe');

    queryBuilder
      .orderBy('recipe.title', filterOptions.order)
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
}
