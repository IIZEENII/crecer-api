import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from '../domain/recipe';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from '../infrastructure/dtos/create-recipe.dto';

@Injectable()
export class RecipeCreator {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<void> {
    const recipeCreated = this.recipeRepository.create(createRecipeDto);
    this.recipeRepository.save(recipeCreated);
  }
}
