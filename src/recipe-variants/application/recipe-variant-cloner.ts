import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/recipe-variant';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateRecipeVariantCloneDto } from '../infrastructure/dtos/create-recipe-variant-clone.dto';

@Injectable()
export class RecipeVariantCloner {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async clone(
    originalVariantId: string,
    cloneRecipeVariantDto: CreateRecipeVariantCloneDto,
  ): Promise<void> {
    const originalVariant = await this.recipeVariantRepository.findOneByOrFail({
      id: originalVariantId,
    });

    delete originalVariant.id;
    originalVariant.name = cloneRecipeVariantDto.nameOfTheVariantClone;

    const cloneOfTheOriginalVariant =
      this.recipeVariantRepository.create(originalVariant);

    await this.recipeVariantRepository.save(cloneOfTheOriginalVariant);
  }
}
