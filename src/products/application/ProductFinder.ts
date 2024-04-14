import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../domain/Product';
import { Repository } from 'typeorm';
import { ProductDto } from '../infrastructure/dtos/Product.dto';
import { PageDto } from '@src/shared/infrastructure/dtos/Page.dto';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';
import { PageMetaDto } from '@src/shared/infrastructure/dtos/PageMeta.dto';

@Injectable()
export class ProductFinder {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(filterOptions: PageOptionsDto): Promise<PageDto<ProductDto>> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    queryBuilder
      .leftJoinAndSelect('product.recipeVariant', 'variant')
      .leftJoinAndSelect('variant.recipe', 'recipe')
      .orderBy(filterOptions.order)
      .skip(filterOptions.skip)
      .take(filterOptions.take)
      .getMany();

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMeta = new PageMetaDto({
      itemCount,
      pageOptionsDto: filterOptions,
    });

    const products = entities.map(
      ({ recipeVariant: { recipe }, ...product }) => {
        return { ...product, category: recipe.category };
      },
    );

    return new PageDto(products, pageMeta);
  }

  async findById(id: string): Promise<ProductDto> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.recipeVariant', 'variant')
      .leftJoinAndSelect('variant.recipe', 'recipe')
      .getOne();

    if (!product) {
      throw new NotFoundException('product not found');
    }

    const {
      recipeVariant: { recipe },
      ...cleanProduct
    } = product;

    return {
      category: recipe.category,
      ...cleanProduct,
    };
  }
}
