import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../entities/RecipeVariant';
import { Repository } from 'typeorm';
import { UpdateRecipeVariantDto } from '../dtos/UpdateRecipeVariant.dto';

@Injectable()
export class RecipeVariantUpdater {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async update(
    id: string,
    updateRecipeVariantDto: UpdateRecipeVariantDto,
  ): Promise<void> {
    try {
      await this.recipeVariantRepository.update(id, updateRecipeVariantDto);
    } catch (error) {
      console.log(error);
    }
  }
}
