import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/recipe-variant';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RecipeVariantCopyNameDto } from '../infrastructure/dtos/recipe-variant-copy-name.dto';

@Injectable()
export class RecipeVariantCopier {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async copy(
    originalRecipeVariantId: string,
    recipeVariantCopyNameDto: RecipeVariantCopyNameDto,
  ): Promise<void> {
    const originalRecipeVariant =
      await this.recipeVariantRepository.findOneByOrFail({
        id: originalRecipeVariantId,
      });

    delete originalRecipeVariant.id;
    originalRecipeVariant.name = recipeVariantCopyNameDto.name;

    const recipeVariantCopy = this.recipeVariantRepository.create(
      originalRecipeVariant,
    );

    await this.recipeVariantRepository.save(recipeVariantCopy);
  }
}
