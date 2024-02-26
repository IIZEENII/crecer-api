import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/recipe-variant';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CloneRecipeVariantDto } from '../infrastructure/dtos/clone-recipe-variant.dto';

@Injectable()
export class RecipeVariantCloner {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async clone(cloneRecipeVariantDto: CloneRecipeVariantDto): Promise<void> {
    const referenceOfTheVariant =
      await this.recipeVariantRepository.findOneByOrFail({
        id: cloneRecipeVariantDto.idOfTheVariantToClone,
      });

    delete referenceOfTheVariant.id;
    referenceOfTheVariant.name = cloneRecipeVariantDto.nameOfTheVariantClone;

    const clonOfTheReference = this.recipeVariantRepository.create(
      referenceOfTheVariant,
    );

    await this.recipeVariantRepository.save(clonOfTheReference);
  }
}
