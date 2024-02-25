import { Injectable } from '@nestjs/common';
import { CreateRecipeVariantDto } from '../infrastructure/dtos/create-recipe-variant.dto';
import { UnitOfWorkVariantsAndProducts } from 'src/shared/infrastructure/unit-of-work/unit-of-work-variants-and-products';

@Injectable()
export class RecipeVariantCreator {
  constructor(private readonly unitOfWork: UnitOfWorkVariantsAndProducts) {}

  async create(createRecipeVariantDto: CreateRecipeVariantDto): Promise<void> {
    try {
      await this.unitOfWork.beginTransaction();

      const recipeVariantCreated =
        this.unitOfWork.recipeVariantRepository.create(createRecipeVariantDto);

      await this.unitOfWork.recipeVariantRepository.save(recipeVariantCreated);

      const productCreated = this.unitOfWork.productRepository.create({
        name: recipeVariantCreated.name,
        recipeVariant: recipeVariantCreated,
      });

      await this.unitOfWork.productRepository.save(productCreated);
      await this.unitOfWork.commitTransaction();
    } catch (error) {
      await this.unitOfWork.rollbackTransaction();
    }
  }
}
