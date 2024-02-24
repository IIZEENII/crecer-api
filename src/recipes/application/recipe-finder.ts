import { Repository } from 'typeorm';
import { Recipe } from '../domain/recipe';
import { InjectRepository } from '@nestjs/typeorm';

export class RecipeFinder {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  findById(id: string): Promise<Recipe> {
    return this.recipeRepository.findOne({ where: { id } });
  }
}
