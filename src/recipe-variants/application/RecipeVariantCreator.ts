import { Injectable } from '@nestjs/common';
import { CreateRecipeVariantDto } from '../infrastructure/dtos/CreateRecipeVariant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/RecipeVariant';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeVariantCreator {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async create(createRecipeVariantDto: CreateRecipeVariantDto) {
    const recipeVariant = this.recipeVariantRepository.create(
      createRecipeVariantDto,
    );

    await this.recipeVariantRepository.save(recipeVariant);
  }
}
