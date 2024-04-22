import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RecipeVariant } from '../entities/RecipeVariant';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecipeVariantDeleter {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async delete(recipeVariant: RecipeVariant) {
    await this.recipeVariantRepository.remove(recipeVariant);
  }
}
