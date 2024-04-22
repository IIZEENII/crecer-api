import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../entities/ingredient';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';
import { PageMetaDto } from '@src/shared/infrastructure/dtos/PageMeta.dto';
import { PageDto } from '@src/shared/infrastructure/dtos/Page.dto';

@Injectable()
export class FindAllIngredientsUsecase {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async execute(filterOptions: PageOptionsDto): Promise<PageDto<Ingredient>> {
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
}
