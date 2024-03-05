import { Repository } from 'typeorm';
import { Recipe } from '../domain/Recipe';
import { InjectRepository } from '@nestjs/typeorm';

export class RecipeDeleter {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async delete(id: string): Promise<void> {
    this.recipeRepository.delete({ id });
  }
}
