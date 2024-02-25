import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/recipe-variant';
import { Repository } from 'typeorm';
import { CreateRecipeVariantDto } from '../infrastructure/dtos/create-recipe-variant.dto';

@Injectable()
export class RecipeVariantCreator {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async create(createRecipeVariantDto: CreateRecipeVariantDto): Promise<void> {
    const recipeVariantCreated = this.recipeVariantRepository.create(
      createRecipeVariantDto,
    );
    this.recipeVariantRepository.save(recipeVariantCreated);
  }
}
