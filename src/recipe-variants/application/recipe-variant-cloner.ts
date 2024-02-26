import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/recipe-variant';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipeVariantCloner {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async cloneVariant(idOfTheReferenceToClone: string): Promise<void> {
    const referenceOfTheVariant =
      await this.recipeVariantRepository.findOneByOrFail({
        id: idOfTheReferenceToClone,
      });

    delete referenceOfTheVariant.id;

    const variantCloned = this.recipeVariantRepository.create(
      referenceOfTheVariant,
    );

    await this.recipeVariantRepository.save(variantCloned);
  }
}
